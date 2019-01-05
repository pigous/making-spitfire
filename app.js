var express         = require ("express"),
    app             = express(),
    mongoose        = require ("mongoose"),
    bodyParser      = require ("body-parser"),
    keys            = require ("./secret/keys"),
    passport        = require ("passport"),
    localStrategy   = require ("passport-local"),
    flash           = require ("connect-flash"),
    indexRoutes     = require("./routes/index"),
    User            = require("./models/user"),
    blogRoutes      = require("./routes/blog"),
    methodOverride  = require("method-override"),
    //to merge more routes together
    indexRoutes     = require("./routes/index");




mongoose.connect(keys.mongoURI);

//jquery parser
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + '/images/'));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment=require("moment");




//passport config
app.use(require("express-session")({
    secret: keys.localSecret, 
    resave: false, 
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error=req.flash("error");
    res.locals.success = req.flash("success");
    next();
    
});

app.use(indexRoutes);
// "/blog" will be added to each of the routes in blogRoutes automatically
app.use("/blog",blogRoutes);
var PORT = process.env.PORT ||  3000;
app.listen(PORT);