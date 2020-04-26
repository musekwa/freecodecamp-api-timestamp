// server.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment')
moment().format()
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date_string?", function (req, res) {
  var param = req.params.date_string

  if (Number.isInteger(Number(param)) && Number(param) >= 0 && typeof Number(param) === 'number'){
      res.json({'unix': Number(param), 'utc': new Date(Number(req.params.date_string)).toUTCString()})
  }
  else if (typeof param === 'string' && !Number(param)){
    var parsed = Date.parse(param)
    var date = new Date(parsed)

    if (date.getTime() === parsed){
      var unix = parsed
      res.json({'unix': unix,'utc': date.toUTCString()})
    }
    else{
      res.json({'error': 'Invalid Date'})
    }
  }
  else if (!param){
    var current = new Date()
    res.json({'unix': Number(current), 'utc': current.toUTCString()})
  }
  else{
    res.json({'error': 'Invalid Date'})
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});