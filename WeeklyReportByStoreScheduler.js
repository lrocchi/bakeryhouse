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
var ExcelManager4Store = require('./utils/excel');
var CommonUtils = require("./utils/common");
var Logger = require("le_node");
const Store = require("./models/Store");
var log = new Logger({
    token: "6c122f92-c9b1-48bb-8ea6-c92c72e4ece2"
});
var WeeklyReportByStoreScheduler = {};

var monthITA = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
];


WeeklyReportByStoreScheduler.startWeekly = function () {
    console.log("[WeeklyReportByStore] Avvio batch Invio report settimanale");
    var schedWeek = schedule.scheduleJob({
        hour: 6,
        minute: 10,
        dayOfWeek: 1
    }, function () {

        // var schedWeek = schedule.scheduleJob("0 30 9 * * 7", function () {
        // console.log("The answer to life, the universe, and everything!");
        console.log("[WeeklyReportByStore] Inizio batch Invio report settimanale");
        var today = new Date();
        var y = today.getFullYear();
        var m = today.getMonth();
        var d = today.getDate();


        var fromDate = new Date(y, m, d - 7, 0, 0, 0, 0);
        var toDate = new Date(y, m, d, 0, 0, 0, 0);

        var month = monthITA[fromDate.getMonth()];
        Store.find().where("active").equals(true).exec(function (err, storeDoc) {
            storeDoc.forEach(function (element) {
                ExcelManager4Store.create(fromDate, toDate, "Weekly_" + element.nome + "_" + today.getDate() + month + y + ".xlsx", element);
            });
        });

        // console.log("BATCH Ultimato");
        console.log("[WeeklyReportByStore] BATCH Creazione report settimanale Ultimato");
    });

    var schedWeekMail = schedule.scheduleJob({
        hour: 6,
        minute: 30,
        dayOfWeek: 1
    }, function () {
        console.log("[WeeklyReportByStore] Invio eMails");
        User.find()
            .where("ruolo")
            .equals("StoreManager")
            // .in(["SuperAdmin"])
            .exec(function (err, userDocs) {
                var today = new Date();
                var y = today.getFullYear();
                var m = today.getMonth();

                var fromDate = new Date(y, m, 1, 0, 0, 0, 0);
                // var toDate = new Date(y, m, 1, 0, 0, 0, 0);

                var month = monthITA[fromDate.getMonth()];
                userDocs.forEach(function (elementUser) {
                    Store.findById(elementUser.store).exec(function (err, currStore) {
                        currStore.forEach(function (elementStore) {
                            var sFileName = "Weekly_" + elementStore.nome + "_" + today.getDate() + month + y + ".xlsx";
                            var messaggio = {};
                            // var dateFormat = new Date(balance.ref_date);
                            messaggio.to = element;
                            messaggio.subject = elementStore.nome + ": " + "Report Incidenza Settimanale";
                            messaggio.message =
                                "In allegato trovi il report delle incidenze relativo alla settimana scorsa.";

                            messaggio.htmlmessage =
                                "In allegato trovi il report delle incidenze relativo alla settimana scorsa.";
                            messaggio.type = "info";

                            // Sand Email a elemet.email
                            return CommonUtils.sendEmailWithAttach(elementUser.email, messaggio.htmlmessage, messaggio.subject, sFileName);
                        });
                    });
                });
            });
    });

    var schedWeekDeleteFile = schedule.scheduleJob({
        hour: 6,
        minute: 50,
        dayOfWeek: 1
    }, function () {
        console.log("[WeeklyReportByStore] Inizio Cancello Files");
        var today = new Date();
        var y = today.getFullYear();
        var m = today.getMonth();

        var fromDate = new Date(y, m, 1, 0, 0, 0, 0);
        // var toDate = new Date(y, m, 1, 0, 0, 0, 0);

        var month = monthITA[fromDate.getMonth()];
        Store.find().where("active").equals(true).exec(function (err, storeDoc) {

            storeDoc.forEach(function (element) {
                var sFileName = "Weekly_" + element.nome + "_" + today.getDate() + month + y + ".xlsx";
                try {
                    fs.unlinkSync(sFileName);
                    console.log('[WeeklyReportByStore] successfully deleted ' + sFileName);
                } catch (err) {
                    console.log("[WeeklyReportByStore] File " + sFileName + " non trovato!");
                }
            });
        });
    });
};







module.exports = WeeklyReportByStoreScheduler;