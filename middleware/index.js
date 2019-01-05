var Blog = require("../models/blog");
var middleWareObject = {};

middleWareObject.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash("error", "Please login");
        res.redirect("/login");
    }
}
middleWareObject.checkBlogOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Blog.findById(req.params.id, function(err, foundBlog){
            if(err || !foundBlog){
                req.flash("error", "Blog entry not found");
                res.redirect("back");
            } 
            else{
                if(foundBlog.author.id.equals(req.user._id)){
                    return next();
                }
                else{
                    req.flash("error", "Permission denied");
                    res.redirect("back");
                }
            
                
            }
        })
    }
    else{
        req.flash("error", "Please log in first");
        res.redirect("/login");
    }
}
module.exports = middleWareObject;