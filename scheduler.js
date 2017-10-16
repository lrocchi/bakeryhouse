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

var schedule = require('node-schedule');
var Client = require('node-rest-client').Client;

var client = new Client();

var BalanceSchedule = new Object();
var ip = process.env.IP || 'http://localhost';
var port = process.env.PORT || 3000;
var adress = ip + ":" +  port;

BalanceSchedule.start = function () {
    var schedPranzo = schedule.scheduleJob('* 30 12 * * *', function () {
        console.log('The answer to life, the universe, and everything!');
        var stores = [];
        client.get(adress + '/api/stores/active', function (data, response) {
            stores = data;
            date = new Date().getUTCDate();
            stores.forEach(function (element) {
                client.get(adress + "/api/balance/" + date + '/' + element._id, function (data, response) {
                    if (Object.keys(data).length < 1) {
                        var args_js = {
                            headers: { 'Content-Type': 'application/json' },
                            data: {
                                "type": 'Pranzo',
                                "value": 25,
                                "date": Date.now().toString(),
                                "store": element._id,
                                "cassa": 0,
                                "pos": 0,
                                "ticket": 0,
                                "capital": 0,
                                "prevCapital": 0
                            }
                        };
                        client.post(adress + "/api/balance/", args_js, function (data, response) {
                            console.log(data);
                        });
                    }
                });
            });
        });
    });




    var schedPomeriggio = schedule.scheduleJob('* 30 16 * * *', function () {
        console.log('The answer to life, the universe, and everything!');
        var stores = [];
        client.get(adress + '/api/stores/active', function (data, response) {
            stores = data;
            date = new Date().getUTCDate();
            stores.forEach(function (element) {
                client.get(adress + "/api/balance/" + date + '/' + element._id, function (data, response) {
                    if (Object.keys(data).length < 2) {
                        var args_js = {
                            headers: { 'Content-Type': 'application/json' },
                            data: {
                                "type": 'Pomeriggio',
                                "value": 50,
                                "date": Date.now().toString(),
                                "store": element._id,
                                "cassa": data[Object.keys(data).length -1].cassa,
                                "pos": data[Object.keys(data).length -1].pos,
                                "ticket": data[Object.keys(data).length -1].ticket,
                                "capital": data[Object.keys(data).length -1].capital,
                                "prevCapital": data[Object.keys(data).length -1].prevCapital
                            }
                        };
                        client.post(adress + "/api/balance/", args_js, function (data, response) {
                            console.log(data);
                        });
                    }
                });
            });
        });
    });


    var schedPomeriggio = schedule.scheduleJob('* 30 20 * * *', function () {
        console.log('The answer to life, the universe, and everything!');
        var stores = [];
        client.get(adress + '/api/stores/active', function (data, response) {
            stores = data;
            date = new Date().getUTCDate();
            stores.forEach(function (element) {
                client.get(adress + "/api/balance/" + date + '/' + element._id, function (data, response) {
                    if (Object.keys(data).length < 3) {
                        var args_js = {
                            headers: { 'Content-Type': 'application/json' },
                            data: {
                                "type": 'Cena',
                                "value": 75,
                                "date": Date.now().toString(),
                                "store": element._id,
                                "cassa": data[Object.keys(data).length -1].cassa,
                                "pos": data[Object.keys(data).length -1].pos,
                                "ticket": data[Object.keys(data).length -1].ticket,
                                "capital": data[Object.keys(data).length -1].capital,
                                "prevCapital": data[Object.keys(data).length -1].prevCapital
                            }
                        };
                        client.post(adress + "/api/balance/", args_js, function (data, response) {
                            console.log(data);
                        });
                    }
                });
            });
        });
    });


    var schedChiusura = schedule.scheduleJob('* 30 04 * * *', function () {
        console.log('The answer to life, the universe, and everything!');
        var stores = [];
        client.get(adress + '/api/stores/active', function (data, response) {
            stores = data;
            date = new Date();
            date.setDate(d.getDate()-1);
            date.getUTCDate();
            stores.forEach(function (element) {
                client.get(adress + "/api/balance/" + date + '/' + element._id, function (data, response) {
                    if (Object.keys(data).length < 3) {
                        var args_js = {
                            headers: { 'Content-Type': 'application/json' },
                            data: {
                                "type": 'Chiusura',
                                "value": 100,
                                "date": date.toString(),
                                "store": element._id,
                                "cassa": data[Object.keys(data).length -1].cassa,
                                "pos": data[Object.keys(data).length -1].pos,
                                "ticket": data[Object.keys(data).length -1].ticket,
                                "capital": data[Object.keys(data).length -1].capital,
                                "prevCapital": data[Object.keys(data).length -1].prevCapital
                            }
                        };
                        client.post(adress + "/api/balance/", args_js, function (data, response) {
                            console.log(data);
                        });
                    }
                });
            });
        });
    });
}




module.exports = BalanceSchedule;