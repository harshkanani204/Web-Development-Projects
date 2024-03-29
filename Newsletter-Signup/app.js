const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(3000, function(){
    console.log("You're listening to port 3000");
});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email, 
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us12.api.mailchimp.com/3.0/lists/543a056e55";

    const options ={
        method: "POST",
        auth: "harshkanani204:6267ff5ffd93676a26ec807cc86b55d2-us12"
    }

    const request = https.request(url,options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }

        else
        {
            res.sendFile(__dirname + "/failure.html");
        }


        response.on("data",function(data){
            console.log(JSON.parse(data));
        });

    });

    request.write(jsonData);
    request.end();

});


app.post("/failure", function(req,res){
    res.redirect("/");
});

// API-key
// 6267ff5ffd93676a26ec807cc86b55d2-us12

// List ID 
// 543a056e55