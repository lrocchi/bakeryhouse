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
var User = require("./models/User");
var Message = require("./models/Message");
var fs = require('fs');
var schedule = require("node-schedule");
var ExcelManager = require('./utils/excel');
var CommonUtils = require("./utils/common");
var Logger = require("le_node");
var log = new Logger({
    token: "6c122f92-c9b1-48bb-8ea6-c92c72e4ece2"
});
var ReportScheduler = new Object();

var monthITA = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
];


ReportScheduler.startMonthly = function () {
    console.log("[ReportScheduler] Avvio batch Invio report mensile");
    var schedMese = schedule.scheduleJob("0 0 7 1 * *", function () {
        // var schedMese = schedule.scheduleJob("0 9 9 1 * *", function () {
        console.log("[ReportScheduler] Inizio batch Invio report mensile");


        var today = new Date();
        var y = today.getFullYear();
        var m = today.getMonth();

        var fromDate = new Date(y, m - 1, 1, 0, 0, 0, 0);
        var toDate = new Date(y, m, 1, 0, 0, 0, 0);

        var month = monthITA[fromDate.getMonth()];

        ExcelManager.create(fromDate, toDate, "Monthly_" + month + y + ".xlsx");
        // console.log("BATCH Ultimato");
        console.log("[ReportScheduler] BATCH Invio report mensile Ultimato");
    });

    var schedMeseMail = schedule.scheduleJob("0 5 7 1 * *", function () {
        // var schedMeseMail = schedule.scheduleJob("0 13 9 1 * *", function () {
        console.log("[ReportScheduler] Invio Emails");
        User.find()
            .where("ruolo")
            .in(["SuperAdmin", "Admin"])
            // .in(["SuperAdmin"])
            .exec(function (err, userDocs) {
                var today = new Date();
                var y = today.getFullYear();
                var m = today.getMonth();

                var fromDate = new Date(y, m - 1, 1, 0, 0, 0, 0);

                var month = monthITA[fromDate.getMonth()];
                var sFileName = "Monthly_" + month + y + ".xlsx";
                userDocs.forEach(function (element) {
                    var messaggio = {};
                    messaggio["to"] = element;
                    messaggio["subject"] = "Report Incidenza Mensile";
                    messaggio["message"] =
                        "In allegato trovi il report delle incidenze relativo al mese scorso.";

                    messaggio["htmlmessage"] =
                        "In allegato trovi il report delle incidenze relativo al mese scorso.";
                    messaggio["type"] = "info";


                    /* Message.create(messaggio, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(data);
                        }

                    }); */
                    // Sand Email a elemet.email
                    return CommonUtils.sendEmailWithAttach(element.email, messaggio.htmlmessage, messaggio.subject, sFileName);
                });
            });
    });

    var schedMeseDeleteFile = schedule.scheduleJob("0 10 7 1 * *", function () {
        // var schedMeseDeleteFile = schedule.scheduleJob("0 14 9 1 * *", function () {
        console.log("[ReportScheduler] Cancello  Files");
        var today = new Date();
        var y = today.getFullYear();
        var m = today.getMonth();

        var fromDate = new Date(y, m - 1, 1, 0, 0, 0, 0);
        var toDate = new Date(y, m, 1, 0, 0, 0, 0);

        var month = monthITA[fromDate.getMonth()];
        var sFileName = "Monthly_" + month + y + ".xlsx";

        try {
            fs.unlinkSync(sFileName);
            console.log('[ReportScheduler] successfully deleted ' + sFileName);
        } catch (err) {
            console.log("[ReportScheduler] File " + sFileName + " non trovato!");
        }
    });

}










module.exports = ReportScheduler;