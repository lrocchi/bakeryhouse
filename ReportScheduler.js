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
var User = require("../models/User");
var Message = require("../models/Message");
var fs = require('fs');
var schedule = require("node-schedule");
var Logger = require("le_node");
var log = new Logger({
    token: "6c122f92-c9b1-48bb-8ea6-c92c72e4ece2"
});
var ReportScheduler = new Object();

var monthITA = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
];


ReportScheduler.startMonthly = function () {
    var schedMese = schedule.scheduleJob("* * 7 1 * *", function () {
        console.log("The answer to life, the universe, and everything!");
        log.info("Inizio batch Invio report mensile");


        var today = new Date();
        var y = today.getFullYear();
        var m = today.getMonth();

        var fromDate = new Date(y, m - 1, 1, 0, 0, 0, 0);
        var toDate = new Date(y, m, 1, 0, 0, 0, 0);

        var month = monthITA[fromDate.getMonth()];

        ExcelManager.create(fromDate, toDate, "ExcelFile_" + month + y + ".xlsx");
        // console.log("BATCH Ultimato");
        log.info("BATCH Invio report mensile Ultimato");
    });

    var schedMeseMail = schedule.scheduleJob("* 30 7 1 * *", function () {
        User.find()
            .where("ruolo")
            .in(["SuperAdmin", "Admin"])
            // .in(["SuperAdmin"])
            .exec(function (err, userDocs) {
                var today = new Date();
                var y = today.getFullYear();
                var m = today.getMonth();

                var fromDate = new Date(y, m - 1, 1, 0, 0, 0, 0);
                var toDate = new Date(y, m, 1, 0, 0, 0, 0);

                var month = monthITA[fromDate.getMonth()];
                var sFileName = "ExcelFile_" + month + y + ".xlsx";
                userDocs.forEach(function (element) {
                    var messaggio = {};
                    var dateFormat = new Date(balance.ref_date);
                    messaggio["to"] = element;
                    messaggio["subject"] = "Report Incidenza Mensile";
                    messaggio["message"] =
                        "In allegato trovi il report delle incidenze relativo al mese scorso.";

                    messaggio["htmlmessage"] =
                        "In allegato trovi il report delle incidenze relativo al mese scorso.";
                    messaggio["type"] = "info";


                    Message.create(messaggio, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(data);
                        }

                    });
                    // Sand Email a elemet.email
                    return CommonUtils.sendEmail(element.email, messaggio.htmlmessage, messaggio.subject, sFileName);
                });
            });
    });

    var schedMeseDeleteFile = schedule.scheduleJob("* 50 7 1 * *", function () {
        var today = new Date();
        var y = today.getFullYear();
        var m = today.getMonth();

        var fromDate = new Date(y, m - 1, 1, 0, 0, 0, 0);
        var toDate = new Date(y, m, 1, 0, 0, 0, 0);

        var month = monthITA[fromDate.getMonth()];
        var sFileName = "ExcelFile_" + month + y + ".xlsx";

        try {
            fs.unlinkSync(sFileName);
            console.log('successfully deleted ' + sFileName);
        } catch (err) {
            // handle the error
        }
    });

}



ReportScheduler.startWeekly = function () {
    var schedWeek = schedule.scheduleJob("* * 6 * * 1", function () {
        console.log("The answer to life, the universe, and everything!");
        log.info("Inizio batch Invio report settimanale");
        var today = new Date();
        var y = today.getFullYear();
        var m = today.getMonth();
        var d = today.getDate()


        var fromDate = new Date(y, m, d - 7, 0, 0, 0, 0);
        var toDate = new Date(y, m, d, 0, 0, 0, 0);

        var month = monthITA[fromDate.getMonth()];

        ExcelManager.create(fromDate, toDate, "ExcelFile_" + month + y + ".xlsx");
        // console.log("BATCH Ultimato");
        log.info("BATCH Invio report settimanale Ultimato");
    });

    var schedWeekMail = schedule.scheduleJob("* 30 6 * * 1", function () {
        User.find()
            .where("ruolo")
            .in(["SuperAdmin", "Admin"])
            // .in(["SuperAdmin"])
            .exec(function (err, userDocs) {
                var today = new Date();
                var y = today.getFullYear();
                var m = today.getMonth();

                var fromDate = new Date(y, m - 1, 1, 0, 0, 0, 0);
                var toDate = new Date(y, m, 1, 0, 0, 0, 0);

                var month = monthITA[fromDate.getMonth()];
                var sFileName = "ExcelFile_" + month + y + ".xlsx";

                userDocs.forEach(function (element) {
                    var messaggio = {};
                    var dateFormat = new Date(balance.ref_date);
                    messaggio["to"] = element;
                    messaggio["subject"] = "Report Incidenza Settimanale";
                    messaggio["message"] =
                        "In allegato trovi il report delle incidenze relativo alla settimana scors.";

                    messaggio["htmlmessage"] =
                        "In allegato trovi il report delle incidenze relativo alla settimana scors.";
                    messaggio["type"] = "info";


                    Message.create(messaggio, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(data);
                        }

                    });
                    // Sand Email a elemet.email
                    return CommonUtils.sendEmail(element.email, messaggio.htmlmessage, messaggio.subject, sFileName);
                });
            });
    });

    var schedWeekDeleteFile = schedule.scheduleJob("* 50 6 * * 1", function () {
        var today = new Date();
        var y = today.getFullYear();
        var m = today.getMonth();

        var fromDate = new Date(y, m - 1, 1, 0, 0, 0, 0);
        var toDate = new Date(y, m, 1, 0, 0, 0, 0);

        var month = monthITA[fromDate.getMonth()];
        var sFileName = "ExcelFile_" + month + y + ".xlsx";

        try {
            fs.unlinkSync(sFileName);
            console.log('successfully deleted ' + sFileName);
        } catch (err) {
            // handle the error
        }
    });
}







module.exports = ReportScheduler;