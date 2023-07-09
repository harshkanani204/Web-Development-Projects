const express = require("express");
const app = express();
const https = require("https");


app.get("/", function(req,res){

    const url = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=a284058456d011022d2d029ca38f1003";
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const des = weatherData.weather[0].description;
            console.log(temp,des);
        });

    });

    res.send("This is the home page");
});


app.listen(3000,function(){
    console.log("You're listening to port 3000");
});