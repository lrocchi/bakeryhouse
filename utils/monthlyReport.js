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
var mongoose = require("mongoose");
var config = require("./config/config");
var schedule = require("node-schedule");
var nodemailer = require("nodemailer");

var MonthlyReportSchedule = new Object();

MonthlyReportSchedule.start = function() {
    var schedPranzo = schedule.scheduleJob("* * * 1 * *", function() {

    });
}

module.exports = MonthlyReportSchedule;