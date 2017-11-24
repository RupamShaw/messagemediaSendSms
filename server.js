// server.js
// where your node app starts

// init project
var axios = require('axios'); 
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');


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
  callback_url: 'https://requestb.in/vl2apgvl'
  
  });
}
  console.log("*********messages");
  console.log(messages);
  //   var credentials =  ("BX6fwDQToAwiQtEGmAB4" + ':' +"zhdRDol9A9Wlzwy1SqkESWRMtuHUpL" );
  // var BasicAuth = 'Basic ' + credentials;
  axios.post("https://api.messagemedia.com/v1/messages",{
        
        withCredentials: true,
    
        headers:{
    //'Authorization': +BasicAuth,
    'Access-Control-Allow-Origin' : '*',
            'Accept': 'application/json',
            "Access-Control-Allow-Credentials":"true"
        },
        auth: {
          username: "BX6fwDQToAwiQtEGmAB4",
          password: "zhdRDol9A9Wlzwy1SqkESWRMtuHUpL"
        },
        responseType: 'json', // default
        
       method: 'post',
        data: { messages : messages }
    }).then(function(response){ console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);})
    .catch(function(error){console.log(error)});
  
/*request.post('https://api.messagemedia.com/v1/messages', {
  json : true,
  body : { messages : messages },
  auth : {
    username : process.env.USERNAME,    password : process.env.PASSWORD
  }
}, function(error, response, body) {
  console.log(body);
  if (response.statusCode < 300){
    console.log(body.messages[0].message_id);
//   setTimeout(function(){
//       console.log("THIS IS waiting for getting submit response" );
//       request.get('https://api.messagemedia.com/v1/messages/'+body.messages[0].message_id,  {
//       json : true,
//       auth : {
//         username : process.env.USERNAME,
//         password : process.env.PASSWORD
//       }
//     },function (request, response) {
//         console.log('status: '+response.body.status);
//         res.send('status :   '+response.body.status);
//       });
//     }, 2000);
   
      request.get('https://api.messagemedia.com/v1/messages/'+body.messages[0].message_id,  {
       json : true,
       auth : {
         username : process.env.USERNAME,
         password : process.env.PASSWORD
       }
     },function (request, response) {
         console.log('status : '+response.body.status);
         res.send('status :   '+response.body.status);
       });
  }else
    res.send("Error from API: " + body);
});  
*/
});

app.listen(process.env.PORT);