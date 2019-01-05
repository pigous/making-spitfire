//access to blog routes

var express = require("express"),
    router = express.Router({mergeParams:true}), 
    Blog = require("../models/blog"),
    middleWareObject = require("../middleware");
//we don't need middleware/signed in to view the entries 
//we need to get all the blog entries from the database 
router.get("/", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err||!blogs){
            req.flash("error", "Blog entries not found");
            res.redirect("back");
        }
        else{
            //here the webapp gives the entries to the html
            res.render("blog/index", {blogs:blogs,page:"blog"});
        };
    });
});
//: means that this is an id, id of the blog(the website's url contains the id of the blog article) - you can refer to this specific object - 
router.get("/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err||!foundBlog){
            req.flash("error", "Entry not found");
        }
        else {
            //the blog entry found by the id will be given to the html
            res.render("blog/show", {blog:foundBlog});
        };
    });
});

//next step: app.js to enable blog routes
    
//create new blog - and we don't need "/blog/" because we have already requested this in app.js

router.get("/new", middleWareObject.isLoggedIn, function(req, res){
    res.render("blog/new");
});
router.post("/new", middleWareObject.isLoggedIn, function(req, res){

//manage data received from the browser - with 'post' 
    var title   = req.body.title;
    var body    = req.body.body;
    var author  = {
        username:req.user.username,
        id:req.user._id
    };
// save blog entry to database
    Blog.create({
        title: title,
        body: body, 
        author: author
    },function(err, blog){
        if(err){
            console.log(err);
        }
        else{
            console.log("blog entry saved", blog);
            req.flash("success", "Entry successfully saved");
            res.redirect("/blog");

        }
    })
})
//we have to create a new middleware to check if the user who is logged in the author of that blog
router.delete("/:id/delete", middleWareObject.checkBlogOwnership, function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err, foundBlog){
        if(err || !foundBlog){
            req.flash("error", "Blog entry not found");
        }
        else{
            req.flash("success", "Entry successfully removed");
            res.redirect("/blog");
        }
    })
})
//with this 'module.exports' - we made the routers accessable to other files
module.exports = router;
