var mongoose = require("mongoose"),
    Campground = require("./models/campgrounds"),
    Comment=require("./models/comment");

var data = [{
        name: "Coorg Valleys",
        image: "https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur ut eveniet repellat optio est, distinctio cupiditate veritatis doloremque, nobis, molestiae adipisci consequuntur. Sapiente corrupti non voluptas at commodi qui culpa soluta minima atque tenetur mollitia cupiditate quam, suscipit hic magnam minus reiciendis facilis perferendis odit. Optio est culpa eius nesciunt delectus officiis voluptate modi veritatis sit, officia voluptatem adipisci libero fugiat odio totam repudiandae soluta minus quisquam ab. Delectus magnam nam perferendis error at cum aspernatur quisquam maxime eius laboriosam nemo fugit asperiores inventore iure nobis libero est eligendi quasi, iste adipisci voluptas ducimus. Nihil perspiciatis atque ex ab sequi."
    },
    {
        name: "Lake Stroke",
        image: "https://static.toiimg.com/photo/40412341.cms",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur ut eveniet repellat optio est, distinctio cupiditate veritatis doloremque, nobis, molestiae adipisci consequuntur. Sapiente corrupti non voluptas at commodi qui culpa soluta minima atque tenetur mollitia cupiditate quam, suscipit hic magnam minus reiciendis facilis perferendis odit. Optio est culpa eius nesciunt delectus officiis voluptate modi veritatis sit, officia voluptatem adipisci libero fugiat odio totam repudiandae soluta minus quisquam ab. Delectus magnam nam perferendis error at cum aspernatur quisquam maxime eius laboriosam nemo fugit asperiores inventore iure nobis libero est eligendi quasi, iste adipisci voluptas ducimus. Nihil perspiciatis atque ex ab sequi."
    },
    {
        name: "Mount Rainier",
        image: "https://www.newzealand.com/assets/Tourism-NZ/Nelson/ba40378fe9/img-1536928144-4748-13836-F53C3949-ED9E-E0DC-CF6EC0D789D9308A__aWxvdmVrZWxseQo_FocalPointCropWzQyNyw2NDAsNTAsNTAsODUsImpwZyIsNjUsMi41XQ.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur ut eveniet repellat optio est, distinctio cupiditate veritatis doloremque, nobis, molestiae adipisci consequuntur. Sapiente corrupti non voluptas at commodi qui culpa soluta minima atque tenetur mollitia cupiditate quam, suscipit hic magnam minus reiciendis facilis perferendis odit. Optio est culpa eius nesciunt delectus officiis voluptate modi veritatis sit, officia voluptatem adipisci libero fugiat odio totam repudiandae soluta minus quisquam ab. Delectus magnam nam perferendis error at cum aspernatur quisquam maxime eius laboriosam nemo fugit asperiores inventore iure nobis libero est eligendi quasi, iste adipisci voluptas ducimus. Nihil perspiciatis atque ex ab sequi."
    }
];
var seedDB = () => {
    Campground.deleteMany({}, (err)=>{
        // if(err)
        // console.log(err);

        // else{
        //     console.log("Removed Campgrounds");

        //     Comment.deleteMany({}, (err)=>{
        //         if(err)
        //         console.log(err);
        //         else
        //         console.log("Removed Comment");
        //     });

        //     for(let seed of data){
        //         Campground.create(seed, (err,campground)=>{
        //             if(err)
        //             console.log(err);
        
        //             else{
        //                 console.log("Added a Campground");
    
        //                 //creating a comment
        //                 Comment.create(
        //                 {
        //                     text: "Good Location, great view and has no internet",
        //                     author: "Homer"
        //                 }, (err,comment)=>{
    
        //                     if(err)
        //                     console.log(err);
    
        //                     else{
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("Created comment");
        //                     }
        //                 });
        //             }
        //         });
        //     }
        // }
    });
}

module.exports = seedDB;