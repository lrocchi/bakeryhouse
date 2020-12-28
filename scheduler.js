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

var querystring = require("querystring");
var http = require("http");
var schedule = require("node-schedule");
var nodemailer = require("nodemailer");
var Client = require("node-rest-client").Client;
var Logger = require("le_node");

var mongoose = require("mongoose");
var config = require("./config/config");
var Store = require("./models/Store");

var log = new Logger({
  token: "6c122f92-c9b1-48bb-8ea6-c92c72e4ece2"
});

var client = new Client();

var BalanceSchedule = new Object();
var ip = process.env.IP || "http://localhost";
var port = process.env.PORT || 3000;
var address = ip + ":" + port;

BalanceSchedule.start = function() {
  var schedPranzo = schedule.scheduleJob("* 0 6 * * *", function() {
    console.log("The answer to life, the universe, and everything!");
    log.info("Inizio batch");
    var stores = [];
    // client.get(address + "/api/stores/active", function(data, response) {
    //stores = data;
    stores = Store.where("active")
      .equals(true)
      .exec(function(err, storeDoc) {
        // console.log(costTypeDoc);
        

        today = new Date();
        today.setUTCHours(0, 0, 0, 1);

        // console.log("STORES:" + JSON.stringify(stores));
        storeDoc.forEach(function(element) {
          element.ref_date = today;

          var id = element._id;
          var obj = element;
          Store.findByIdAndUpdate(id, obj, function(err, data) {
            if (err) {
              console.log(err);
            }
            // console.log("Aggiornato store: " + data.nome);
          });

          
        });
        // console.log("BATCH Ultimato");
        log.info("BATCH Ultimato");
      });
      
    // });
  });
};


module.exports = BalanceSchedule;
