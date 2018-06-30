var querystring = require("querystring");
var http = require("http");

var Balance = require("../models/Balance");
var User = require("../models/User");
var Message = require("../models/Message");

var moment = require('moment');

var nodemailer = require('nodemailer');


/* const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'cngcba4h3o6w2nyu@ethereal.email',
    pass: 'By9b8cFxau2BxxYvEm'
  }
}); */

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: 'info@bakeryhouse.it',
    pass: 'Iuiutree1981'
  }
});


var CommonUtils = new Object();

CommonUtils.getBalanceAlert = function (balance) {
  if (balance) {
    console.log("balance.rafa: " + balance.rafa);
    if (balance.rafa < 0) {

      User.find()
        .where("ruolo")
        // .in(["SuperAdmin", "Admin"])
        .in(["SuperAdmin"])
        .exec(function (err, userDocs) {
          userDocs.forEach(function (element) {
            var messaggio = {};
            var dateFormat = new Date(balance.ref_date);
            messaggio["to"] = element;
            messaggio["subject"] = "Alert: controllo del blu";
            messaggio["message"] =
              "Nel redinconto di: " +
              balance.type +
              " dello store: " + balance.store.nome + " del giorno: " + moment(dateFormat).format('DD/MM/YYYY') + " il blu ha un valore negativo."
              ;

            messaggio["htmlmessage"] =
              "Nel redinconto di: <b>" +
              balance.type +
              "</b><br/>dello store: <b>" + balance.store.nome + "</b><br/>del giorno: <b>" + moment(dateFormat).format('DD/MM/YYYY') + "</b><br/>il blu ha un valore negativo."
              ;
            messaggio["type"] = "alert";
            messaggio["store"] = balance.store;

            Message.create(messaggio, function (err, data) {
              if (err) {
                console.log(err);
              } else {
                console.log(data);
              }

            });
            // Sand Email a elemet.email
            return CommonUtils.sendEmail(element.email, messaggio.htmlmessage, messaggio.subject);
          });
        });






    } else {
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
          .populate("store")
          .populate("user")
          .exec(function (err, balanceDocs) {
            if (balanceDocs[0].rafa > currRafa) {
              User.find()
                .where("ruolo")
                .in(["SuperAdmin", "Admin"])
                // .in(["SuperAdmin"])
                .exec(function (err, userDocs) {
                  userDocs.forEach(function (element) {
                    var messaggio = {};
                    var dateFormat = new Date(balance.ref_date);
                    messaggio["to"] = element;
                    messaggio["subject"] = "Alert: controllo del blu";
                    messaggio["message"] =
                      "Nel redinconto di " +
                      balanceType +
                      " dello store: " + balance.store.nome + " del giorno: " + moment(dateFormat).format('DD/MM/YYYY') + " il blu è minore rispetto al rendiconto precedente."
                      ;

                    messaggio["htmlmessage"] =
                      "Nel redinconto di <b>" +
                      balanceType +
                      "</b><br/>dello store: <b>" + balance.store.nome + "</b><br/>del giorno: <b>" + moment(dateFormat).format('DD/MM/YYYY') + "</b><br/>il blu è minore rispetto al rendiconto precedente."
                      ;
                    messaggio["type"] = "alert";
                    messaggio["store"] = balance.store;

                    Message.create(messaggio, function (err, data) {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log(data);
                      }

                    });
                    // Sand Email a elemet.email
                    return CommonUtils.sendEmail(element.email, messaggio.htmlmessage, messaggio.subject);
                  });
                });
              // Salve messaggio
            }
          });
      }
    }
  }
};



CommonUtils.sendEmail = function (sEmail, sMessage, sSubject) {

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Sistema BakeryHouseMgmt 👻" <info@bakeryhouse.it>', // sender address
    to: sEmail, // list of receivers
    subject: sSubject, // Subject line
    text: sMessage, // plain text body
    html: '<p>' + sMessage + '</p>' // html body
  };


  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    // console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
};



CommonUtils.sendEmailWithAttach = function (sEmail, sMessage, sSubject, filePath) {

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Sistema BakeryHouseMgmt 👻" <info@bakeryhouse.it>', // sender address
    to: sEmail, // list of receivers
    subject: sSubject, // Subject line
    text: sMessage, // plain text body
    html: '<p>' + sMessage + '</p>', // html body
    attachments: [
      {   // utf-8 string as an attachment
        path: filePath,
      }]
  };


  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    // console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
};


module.exports = CommonUtils;
