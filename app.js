var express         = require ("express"),
    app             = express(),
    indexRoutes     = require("./routes/index");



app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + '/images/'));


app.use(indexRoutes);


var PORT = process.env.PORT ||  3000;
app.listen(PORT);