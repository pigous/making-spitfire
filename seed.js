var mongoose = require ("mongoose"), 
    Blog     = require ("./models/blog"),
    User     = require ("./models/user"), 
    loremIpsum = require ("lorem-ipsum");
  
function seedDB(user){
    //remove all existing blog entries without any requirements 'if'
    Blog.remove({}, function (err, blogs){
        if(err){
            console.log(err);
        }
        else{
    //add blog entries
    //cycle
            for(var i=0; i<7; i++){
                //defining what happens in each cycle
                Blog.create({
                    title: loremIpsum({count:1, units:"sentences", format:"html"}),
                    body:  loremIpsum({count:3, units:"paragraphs", format:"html"}),
                    author: {
                        username: user.username,
                        id:user._id}
                },function(err, blog){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("blog added");
                    }
                } )
            }
            for(var i=0; i<2; i++){
                //defining what happens in each cycle
                Blog.create({
                    title: loremIpsum({count:1, units:"sentences", format:"html"}),
                    body:  loremIpsum({count:2, units:"sentences", format:"html"}),
                    author: {
                        username: user.username,
                        id:user._id}
                },function(err, blog){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("blog added");
                    }
                } )
            }
        }
    })
} 
module.exports = seedDB;