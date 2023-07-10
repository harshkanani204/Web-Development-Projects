const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(3000, function(){
    console.log("You're listening to port 3000");
});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    console.log(firstName, lastName, email);
});