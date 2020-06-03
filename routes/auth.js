var express=require('express'),
    router=express.Router(),
    passport  =require('passport'),
    User = require('../models/user');

router.get("/register", (req,res)=>{
  res.render("auth/register");
});

router.post("/register", (req,res)=>{
  var newUser= new User({username: req.body.username});
  User.register(newUser, req.body.password, (err,user)=>{
    if(err){
      req.flash("error", err.message);
      res.redirect("back");
    }

    else{
      passport.authenticate("local")(req,res,function(){
        req.flash("success", "Welcome to YelpCamp "+ user.username);
        res.redirect("/campgrounds"); 
      });
    }
  });
});

router.get("/login", (req,res)=>{
  res.render("auth/login");
});

router.post("/login", passport.authenticate("local",
{
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}));

router.get("/logout", (req,res)=>{
  req.logout();
  req.flash("success", "Logged Out");
  res.redirect("/campgrounds");
});
  
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/login");
}

module.exports = router;