const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){

    res.sendFile(__dirname+"/index.html");
    
});

app.post("/", function(req,res){

    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=a284058456d011022d2d029ca38f1003";
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const des = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = "https://openweathermap.org/img/wn/"+ icon + "@2x.png";
            res.write("<p>The weather is currently "+ des + "</p>");
            res.write("<h1>The temperature is " + temp + " Kelvin </h1>");
            res.write("<img src='" + iconURL+ "'/>");
            res.send();
        });

    });
});


app.listen(3000,function(){
    console.log("You're listening to port 3000");
});