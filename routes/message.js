var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var Message = require("../models/Message");

// GET ONLY active Store
router.get("/unread/:user_id", function(req, res, next) {
  Message.where("to")
    .equals(req.params.user_id)
    .where("unread")
    .equals(true)
    .exec(function(err, msgDoc) {
       return res.json(msgDoc);
    });
});

router.post("/", function(req, res, next) {
  Message.create(req.body, function(err, data) {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: "Messaggio non inviato.",
        data: data
      });
    }
    res.json({
      success: true,
      message: "Messaggio inviato con successo",
      data: data
    });
  });
});

module.exports = router;
