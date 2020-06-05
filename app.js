var express=require('express'),
    app=express(),
    bodyParser=require('body-parser'),
    mongoose = require('mongoose'),
    camp = require("./models/campgrounds"),
    seedDB = require("./seeds"),
    comments = require("./models/comment"),
    passport = require("passport"),
    User = require('./models/user'),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash = require('connect-flash');

var commentRoutes = require("./routes/comment"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes = require("./routes/auth");

mongoose.set('useUnifiedTopology', true);
mongoURL=process.env.MONGODB_URI || "mongodb://localhost:27017/yelpcamp";
mongoose.connect(mongoURL, {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname+"/public"));
//for PUT and DELETE requests
app.use(methodOverride("_method"));
//for flash messages
app.use(flash());
// seedDB();

//passport config
app.use(require('express-session')({
  secret: "Thy campgrounds",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.locals.moment = require('moment');

//Our own piece of middleware that ensures that the currentUser variable can be accessed from anywhere in the application
app.use(function(req, res, next){
  //the line below makes sure that whenever the currentUser variable is called, the value of req.user is passed
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(authRoutes);

app.listen(process.env.PORT || 3000, ()=>{
  console.log("Listening to Yelp Camp on port 3000");
});
