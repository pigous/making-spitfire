var express     = require("express"),
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

module.exports = router;
