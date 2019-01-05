var express     = require("express"),
    User        = require("../models/user"),
    passport    = require("passport"),
    keys        = require("../secret/keys"),
    seed        = require("../seed"),
    middleWareObject = require("../middleware"),
    router      = express.Router();



router.get("/", function(req, res){
    res.render("landing", {page: "home"});
});

router.get("/contact", function(req, res){
    res.render("contact/contact", {page: "contact"});
});

router.get("/discover", function(req, res){
    res.render("discover/discover", {page: "discover"});
});

router.get("/inform", function(req, res){
    res.render("inform/inform", {page: "inform"});
});
router.get("/events", function(req, res){
    res.render("events/events", {page: "events"});
});

router.get("/project", function(req, res){
    res.render("project/project", {page: "project"});
});

router.get("/story", function(req, res){
    res.render("story/story", {page: "story"});
});

router.get("/team", function(req, res){
    res.render("team/team", {page: "team"});
});

router.get("/design", function(req, res){
    res.render("discover/design", {page: "design"});
});
router.get("/commercials", function(req, res){
    res.render("discover/commercials", {page: "commercials"});
});

router.get("/icon", function(req, res){
    res.render("icon/icon", {page: "icon"});
});
router.get("/seedDatabase", middleWareObject.isLoggedIn, function(req, res){
    seed(req.user);
    res.redirect("/blog");
});
//login page
router.get("/login", function(req, res){
    res.render("useradmin/login", {page: "login"});
});
router.post("/login", passport.authenticate("local", {
    successRedirect: "/", 
    failureRedirect: "/login"
}), function(req, res){

});

//signup page
router.get("/signup", function(req, res){
    res.render("useradmin/signup", {page: "signup"});
});
router.post("/signup", function(req, res){
    User.register(new User ({
        username: req.body.username}), 
        req.body.password, function (err, user){
            if(err){
                req.flash("error", err.message);
              //  console.log (err.message); 
                return res.render("useradmin/signup",{error: err.message});

            } else{
                passport.authenticate("local")(req, res, function(){
                    req.flash("success", "Welcome to Spitfire Blog: " + user.username);
                    //console.log("Welcome to Spitfire Blog: " + user.username);
                    res.redirect("/")
                });
            }
    });
});

//logout page
router.get("/logout", function(req, res){
    req.logout(); 
    req.flash("success", "Successfully logged out");
    res.redirect("/");
});

module.exports = router;
