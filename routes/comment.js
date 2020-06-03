var express=require('express'),
    camp = require("../models/campgrounds"),
    router=express.Router(),
    comments = require("../models/comment"),
    middleware = require("../middleware/index.js");

router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn, (req,res)=>{
    camp.findById(req.params.id, (err,found)=>{
      if(err)
      console.log(err);
  
      else
      res.render("comments/new", {campgrounds: found});  
    });
  });
  
  router.post("/campgrounds/:id/comments",middleware.isLoggedIn, (req,res)=>{
  
    camp.findById(req.params.id, (err,found)=>{
      if(err){
        console.log(err);
        res.redirect("/campgrounds");
      } 
      
      else{
        comments.create(req.body.comment, (err,done)=>{
          if(err)
          res.redirect("/campgrounds/" + req.params.id +"/comments/new");
      
          else{
            console.log(req.user.username);
            done.author.id = req.user._id;
            done.author.username = req.user.username ; 
            done.save();
            found.comments.push(done);
            found.save();
            res.redirect("/campgrounds/" + req.params.id);
          }
        });
      }
    });
  });

  router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwner, (req,res)=>{
    camp.findById(req.params.id, (err,foundCamp)=>{
      if(err)
      res.redirect("back");

      else{
        comments.findById(req.params.comment_id, (err,foundComment)=>{
          if(err)
          res.redirect("back");

          else{
            res.render("comments/edit", {campgrounds: foundCamp, comment: foundComment});
          }
        })
      }
    }); 
  });

  router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwner, (req,res)=>{
    comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err)=>{
      if(err)
      res.redirect("back");

      else{
        res.redirect("/campgrounds/"+req.params.id);
      }
    });
  });

  router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwner, (req,res)=>{
    comments.findByIdAndDelete(req.params.comment_id, (err)=>{
      if(err)
      res.redirect("back");
      else{
        req.flash("success", "Deleted Comment");
        res.redirect("back");
      }
      
    });
  });

  module.exports = router;