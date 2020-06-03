var express=require('express'),
    router=express.Router(),
    camp = require("../models/campgrounds"),
    comments = require("../models/comment"),
    middleware = require("../middleware/index.js");

router.get("/", (req,res)=>{
  res.render("landing");
});

router.get("/campgrounds", (req,res)=>{

  // req.user returns information of the user logged in like their id, username(but not password ofc)
  // which can be used to get data for the currently logged in user and use it accordingly in our applicaiton
  // returns undefined if no user is logged in

  console.log(req.user);
  camp.find({}, (err,camp)=>{
    if(err){
      console.log("Something went wrong");
      console.log(err);
    }
    else{
      res.render("campgrounds/campgrounds", {campgrounds: camp});
    }
  });
});

router.post("/campgrounds",middleware.isLoggedIn,function(req, res){
  var image=req.body.image;
  var price=req.body.price;
  var name=req.body.name;
  var desc=req.body.description;
  var username = req.user.username;
  var id = req.user._id;

  camp.create({
    name: name,
    price: price,
    image: image,
    description: desc,
    author: {
      id: id,
      username: username
    }
  }, (err,camp)=>{
    if(err)
    console.log("Something went wrong");

    else
    console.log("Added Campsite");

    res.redirect("/campgrounds");
  });


});

router.get("/campgrounds/new",middleware.isLoggedIn, function(req,res){
  res.render("campgrounds/new");
});

router.get("/campgrounds/:id", (req,res)=>{
  camp.findById(req.params.id).populate("comments").exec((err, found)=>{
    if(err)
    console.log(err);

    else{
      console.log(found);
      res.render("campgrounds/shows", {camp: found});
    }
  });
});

// Edit campground route
router.get("/campgrounds/:id/edit",middleware.checkCampOwner, (req,res)=>{
  camp.findById(req.params.id , (err,found)=>{
    if(err){
      res.redirect("/campgrounds");
    }
    else{
      res.render("campgrounds/edit", {found: found});
    }
  });
});


//Update Campground route
router.put("/campgrounds/:id",middleware.checkCampOwner,(req,res)=>{
  //find and update the campground
  camp.findByIdAndUpdate(req.params.id, req.body.cg, (err,updatedCamp)=>{
    if(err)
    res.redirect("/campgrounds");

    else{
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//Delete campground route

router.delete("/campgrounds/:id",middleware.checkCampOwner, (req,res)=>{
  camp.findByIdAndRemove(req.params.id, (err)=>{
    if(err)
    res.redirect("/campgrounds");
    else
    res.redirect("/campgrounds");
  });
});



module.exports = router;
  