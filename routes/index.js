var express     = require("express"),
    router      = express.Router();


router.get("/", function(req, res){
    res.render("landing");
});

router.get("/contact", function(req, res){
    res.render("contact/contact");
});

router.get("/discover", function(req, res){
    res.render("discover/discover");
});

router.get("/inform", function(req, res){
    res.render("inform/inform");
});

router.get("/project", function(req, res){
    res.render("project/project");
});

router.get("/story", function(req, res){
    res.render("story/story");
});

router.get("/team", function(req, res){
    res.render("team/team");
});

module.exports = router;
