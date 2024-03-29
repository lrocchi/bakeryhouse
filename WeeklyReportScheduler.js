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
var WeeklyReportScheduler = {};

var monthITA = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
];



WeeklyReportScheduler.startWeekly = function () {
    console.log("[WeeklyReportScheduler] Avvio batch Invio report settimanale");
    var schedWeek = schedule.scheduleJob({
        hour: 6,
        minute: 1,
        dayOfWeek: 1
    }, function () {

        // var schedWeek = schedule.scheduleJob("0 30 9 * * 7", function () {
        console.log("[WeeklyReportScheduler] Inizio batch Invio report settimanale");
        var today = new Date();
        var y = today.getFullYear();
        var m = today.getMonth();
        var d = today.getDate();


        var fromDate = new Date(y, m, d - 7, 0, 0, 0, 0);
        var toDate = new Date(y, m, d, 0, 0, 0, 0);

        var month = monthITA[fromDate.getMonth()];

        ExcelManager.create(fromDate, toDate, "Weekly_" + today.getDate() + month + y + ".xlsx");
        // console.log("BATCH Ultimato");
        console.log("[WeeklyReportScheduler] BATCH Invio report settimanale Ultimato");
    });

    var schedWeekMail = schedule.scheduleJob({
        hour: 6,
        minute: 30,
        dayOfWeek: 1
    }, function () {
        console.log("[WeeklyReportScheduler] Invio Emails");
        User.find()
            .where("ruolo")
            .in(["SuperAdmin", "Admin"])
            // .in(["SuperAdmin"])
            .exec(function (err, userDocs) {
                var today = new Date();
                var y = today.getFullYear();
                var m = today.getMonth();

                var fromDate = new Date(y, m, 1, 0, 0, 0, 0);
                // var toDate = new Date(y, m, 1, 0, 0, 0, 0);

                var month = monthITA[fromDate.getMonth()];
                var sFileName = "Weekly_" + today.getDate() + month + y + ".xlsx";

                userDocs.forEach(function (element) {
                    var messaggio = {};
                    // var dateFormat = new Date(balance.ref_date);
                    messaggio.to = element;
                    messaggio.subject = "Report Incidenza Settimanale";
                    messaggio.message =
                        "In allegato trovi il report delle incidenze relativo alla settimana scorsa.";

                    messaggio.htmlmessage =
                        "In allegato trovi il report delle incidenze relativo alla settimana scorsa.";
                    messaggio.type = "info";


                    /*  Message.create(messaggio, function (err, data) {
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

    var schedWeekDeleteFile = schedule.scheduleJob({
        hour: 6,
        minute: 50,
        dayOfWeek: 1
    }, function () {
        console.log("[WeeklyReportScheduler] Cancello  Files");
        var today = new Date();
        var y = today.getFullYear();
        var m = today.getMonth();

        var fromDate = new Date(y, m, 1, 0, 0, 0, 0);
        // var toDate = new Date(y, m, 1, 0, 0, 0, 0);

        var month = monthITA[fromDate.getMonth()];
        var sFileName = "Weekly_" + today.getDate() + month + y + ".xlsx";

        try {
            fs.unlinkSync(sFileName);
            console.log('[WeeklyReportScheduler] successfully deleted ' + sFileName);
        } catch (err) {
            console.log("[WeeklyReportScheduler] File " + sFileName + " non trovato!");
        }
    });
};







module.exports = WeeklyReportScheduler;