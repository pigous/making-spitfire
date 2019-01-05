var mongoose = require("mongoose");

//creating blog schema
var BlogSchema = new mongoose.Schema({
    title: String, 
    body: String, 
    createdAt: {type:Date, default: Date.now}, 
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }, 
        username: String
    }
});

module.exports = mongoose.model("Blog", BlogSchema);