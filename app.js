require("dotenv").config()

const express = require("express");

const app = express();

const https = require("https");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey =process.env.APIKEY;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit

  https.get(url, function(response) {
    console.log();

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The weather is currently " + weatherDescription + "</h1>");
      res.write("<h1>The temperature in " +query + " is " + temp + " degrees Celcious</h1>");
      res.write("<img src=" + imageUrl + ">")
      res.send()
    });
  });
});

app.listen(3000, function() {
  console.log("The server is running on port 3000 now ")
});
