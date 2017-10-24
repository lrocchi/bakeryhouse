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

var schedule = require("node-schedule");
var nodemailer = require("nodemailer");
var Client = require("node-rest-client").Client;

var client = new Client();

var BalanceSchedule = new Object();
var ip = process.env.IP || "http://localhost";
var port = process.env.PORT || 3000;
var adress = ip + ":" + port;

BalanceSchedule.start = function() {
  var schedPranzo = schedule.scheduleJob("* 30 12 * * *", function() {
    console.log("The answer to life, the universe, and everything!");
    var stores = [];
    client.get(adress + "/api/stores/active", function(data, response) {
      stores = data;
      date = new Date().getUTCDate();
      stores.forEach(function(element) {
        client.get(
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
        );
      });
    });
  });

  var schedPomeriggio = schedule.scheduleJob("* 30 16 * * *", function() {
    console.log("The answer to life, the universe, and everything!");
    var stores = [];
    client.get(adress + "/api/stores/active", function(data, response) {
      stores = data;
      date = new Date().getUTCDate();
      stores.forEach(function(element) {
        client.get(
          adress + "/api/balance/" + date + "/" + element._id,
          function(data, response) {
            if (Object.keys(data).length < 2) {
                
              mailOptions.text =
                "Non è stato inserito il bilancio del pomeriggio!";
              transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
            }
          }
        );
      });
    });
  });

  var schedPomeriggio = schedule.scheduleJob("* 30 20 * * *", function() {
    console.log("The answer to life, the universe, and everything!");
    var stores = [];
    client.get(adress + "/api/stores/active", function(data, response) {
      stores = data;
      date = new Date().getUTCDate();
      stores.forEach(function(element) {
        client.get(
          adress + "/api/balance/" + date + "/" + element._id,
          function(data, response) {
            if (Object.keys(data).length < 3) {
              mailOptions.text = "Non è stato inserito il bilancio di cena!";
              transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
            }
          }
        );
      });
    });
  });

  var schedChiusura = schedule.scheduleJob("* 30 04 * * *", function() {
    console.log("The answer to life, the universe, and everything!");
    var stores = [];
    client.get(adress + "/api/stores/active", function(data, response) {
      stores = data;
      date = new Date();
      date.setDate(d.getDate() - 1);
      date.getUTCDate();
      stores.forEach(function(element) {
        client.get(
          adress + "/api/balance/" + date + "/" + element._id,
          function(data, response) {
            if (Object.keys(data).length < 3) {
              mailOptions.text = "Non è stato inserita la chiusura!";
              transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
            }
          }
        );
      });
    });
  });

  var transporter = nodemailer.createTransport({
    host: "authsmtp.securemail.pro",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "app_bakery@lrocchi.it",
      pass: "Zaq12wsx$1234"
    }
  });

  var mailOptions = {
    from: "app_bakery@lrocchi.it",
    to: "stefano.rocchi@bakeryhouse.it",
    subject: "Verifica inserimento bilanci e chiusure",
    text:
      "Non è stato inserito il bilancio o la chiusura all'orario prestabilito!"
  };
};

module.exports = BalanceSchedule;
