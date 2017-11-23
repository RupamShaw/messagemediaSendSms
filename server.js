// server.js
// where your node app starts

// init project
var express = require('express');
//var app = express();
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// // http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));

// // http://expressjs.com/en/starter/basic-routing.html
// app.get("/", function (request, response) {
//   response.sendFile(__dirname + '/views/index.html');
// });

// app.get("/dreams", function (request, response) {
//   response.send(dreams);
// });

// // could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
// app.post("/dreams", function (request, response) {
//   dreams.push(request.query.dream);
//   response.sendStatus(200);
// });

// // Simple in-memory store for now
// var dreams = [
//   "Find and count some sheep",
//   "Climb a really tall mountain",
//   "Wash the dishes"
// ];

// // listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });

var app = express();
app.use(bodyParser.urlencoded({ extended : true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.post("/sendMessages", function (req, res) {
var numbers = req.body.numbers.split(/[\r\n]+/g);
var message = req.body.message;

var messages = [];
for (var n in numbers) {
messages.push({
  content : message,
  destination_number : numbers[n],
  callback_url: 'https://requestb.in/1d56c3n1'
  
  });
}
  
request.post('https://api.messagemedia.com/v1/messages', {
  json : true,
  body : { messages : messages },
  auth : {
    username : process.env.USERNAME,
    password : process.env.PASSWORD
  }
}, function(error, response, body) {
  if (response.statusCode < 300){
    res.send("OK");
    console.log(body.messages[0].message_id);
    re
  }
  else
    res.send("Error from API: " + body);
});  
});

app.listen(process.env.PORT);