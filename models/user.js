var mongoose = require ("mongoose"), 
    passportLocalMongoose = require("passport-local-mongoose");

// creating user scheme

var UserSchema = new mongoose.Schema({
    username: {type:String, unique: true, required: true},
    password: String, 
    // firstname: String,
    // lastname: String,
    // email: {type = String, unique:true, required:true}
});
UserSchema.plugin(passportLocalMongoose);


module.exports =mongoose.model("User",UserSchema);