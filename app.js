const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "260762aeb8c59854eec0cebb66232f54";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const humidity=weatherData.main.humidity;
      const description = weatherData.weather[0].description;
      const image = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+image+"@2x.png";
      res.write("<p>The weather is currently "+ description+"</p>");
      res.write("<h1>The temperature in "+req.body.cityName+" is "+ temp +" degrees Celsius, and the humidity is " + humidity +" </h1>");
      res.write("<img src="+ imageURL +">");
      res.send();
    });
  });
});



app.listen(3000, function(){
  console.log("System started on port 3000.");
});
