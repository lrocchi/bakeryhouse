/*
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
 */

var querystring = require('querystring');
var http = require('http');

var schedule = require("node-schedule");
var nodemailer = require("nodemailer");
var Client = require("node-rest-client").Client;

var client = new Client();

var BalanceSchedule = new Object();
var ip = process.env.IP || "http://localhost";
var port = process.env.PORT || 3000;
var address = ip + ":" + port;

BalanceSchedule.start = function() {
  var schedPranzo = schedule.scheduleJob("* 0 10 * * *", function() {
    console.log("The answer to life, the universe, and everything!");
    var stores = [];
    client.get(address + "/api/stores/active", function(data, response) {
      stores = data;
      today = new Date();
      today.setUTCHours(0, 0, 0, 1);
      stores.forEach(function(element) {
        /* client.get(
          adress + "/api/balance/" + date + "/" + element._id,
          function(data, response) {
            if (Object.keys(data).length < 1) {
              mailOptions.text = "Non è stato inserito il bilancio di pranzo!";
              transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
            }
          }
        ); */
        element.ref_date = today;
        /* var args = {
          path: { id: element._id },
          data: JSON.stringify(element)
        };

        client.put(address + "/api/stores/${id}", args, function(data, response) {
          // parsed response body as js object
          console.log(data);
          // raw response
          console.log(response);
        }); */

        var endpoint = "/api/stores/" + element._id;
        BalanceSchedule.performRequest(endpoint, 'PUT', element,function(dataSuccess) {
          console.log("Aggiornato giorno di riferimento nello store " + element.nome);
        });

      });
    });
  });
};


BalanceSchedule.performRequest = function(endpoint, method, data, success) {
  var dataString = JSON.stringify(data);
  var headers = {};
  
  if (method == 'GET') {
    endpoint += '?' + querystring.stringify(data);
  }
  else {
    headers = {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length
    };
  }
  var options = {
    host: process.env.IP || 'localhost',
    path: endpoint,
    port: 3000,
    method: method,
    headers: headers
  };

  var req = http.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      console.log(responseString);
      var responseObject = JSON.parse(responseString);
      success(responseObject);
    });
  });

  req.write(dataString);
  req.end();
};

module.exports = BalanceSchedule;
