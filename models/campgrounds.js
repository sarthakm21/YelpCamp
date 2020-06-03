var mongoose = require('mongoose');

//Schema setup
var campSchema=new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: String
    }
  });
  
  var camp=mongoose.model("camp",campSchema);
  module.exports = camp;