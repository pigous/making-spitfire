//if we are in prod environment - meaning:  getting the keys from server

if(process.env.NODE_ENV==="production"){
    module.exports=require("./prod_keys");
}

//if we are in dev environment - then we get the keys locally
else{
    module.exports=require("./dev_keys");
}
//in gitignore we have the dev_keys, so it will be only stored locally