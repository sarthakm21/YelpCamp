var camp = require("../models/campgrounds"),
    comments = require("../models/comment");

let middlewareObj = {};

middlewareObj.checkCommentOwner= (req,res,next) => {
    if(!req.isAuthenticated()){
      req.flash("Please login first");
      res.redirect("/login");
    }

    else{
      comments.findById(req.params.comment_id, (err,found)=>{
        if(err)
        res.redirect("back");

        else{
          
          if (!found) {
            req.flash("error", "Item not found.");
            return res.redirect("back");
          }

          if(found.author.id.equals(req.user._id)){
            next();
          } else {
            res.redirect("back");
          }
        }
      });      
    }
}

middlewareObj.checkCampOwner = (req,res,next) => {
    if(!req.isAuthenticated()){
      res.redirect("/login");
    } else {
      camp.findById(req.params.id , (err,found)=>{
        if(err){
          res.redirect("back");
        }
        else{
          //found.author.id is an object
          //req.user._id is a String

          if (!found) {
            req.flash("error", "Item not found.");
            return res.redirect("back");
          }

          if(found.author.id.equals(req.user._id))
          next();

          else{
            req.flash("error", "You don't have permission to do that");
            res.redirect("/campgrounds");
          }
        }
      });
    }
}

middlewareObj.isLoggedIn = (req,res,next) => {
    if(req.isAuthenticated()){
      return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
}

module.exports = middlewareObj;