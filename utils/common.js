var querystring = require("querystring");
var http = require("http");

var Balance = require("../models/Balance");
var User = require("../models/User");
var Message = require("../models/Message");

var moment = require('moment');
var CommonUtils = new Object();

CommonUtils.getBalanceAlert = function(balance) {
  if (balance) {
    var currRafa = balance.rafa;
    var balanceType = balance.type;
    if (balance.value > 25) {
      Balance.find()
        .where("store")
        .equals(balance.store)
        .where("ref_date")
        .equals(balance.ref_date)
        .sort({ value: "desc" })
        .where("value")
        .equals(balance.value - 25)
        .exec(function(err, balanceDocs) {
          if (balanceDocs[0].rafa > currRafa) {
            User.find()
              .where("ruolo")
              .in(["SuperAdmin", "Admin"])
              .exec(function(err, userDocs) {
                userDocs.forEach(function(element) {
                  var messaggio = {};
                  var dateFormat = new Date(balance.ref_date);
                  messaggio["to"] = element;
                  messaggio["subject"] = "Alert: controllo del blu";
                  messaggio["message"] = 
                    "Nel redinconto di " +
                      balanceType +
                      " del " + moment(dateFormat).format('MM/DD/YYYY') + " il blu è minore rispetto al rendiconto precedente."
                  ;
                  messaggio["type"] = "alert";
                  messaggio["store"] = balance.store;

                  Message.create(messaggio, function(err, data) {
                    if (err) {
                      console.log(err);
                    }else{
                      console.log(data);
                    }

                  });
                });
              });
            // Salve messaggio
          }
        });
    }
  }
};

module.exports = CommonUtils;
