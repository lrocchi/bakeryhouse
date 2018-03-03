var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var config = require("../config/config");

var Spese = require("../models/Cost");
var Store = require("../models/Store");

// Report
router.get("/", function(req, res, next) {
  // console.log("from: " + req.query.from);
  // console.log("to: " + req.query.to);
  if (req.query.store) {
    console.log("store: " + req.query.store);
    Spese.find()
      .where("store")
      .equals(req.query.store)
      .where("ref_date")
      // .gte(new Date(refDate.getFullYear(), refDate.getMonth(), refDate.getDate()))
      .gte(storeData.ref_date)
      .populate("utente")
      .populate("tipo")
      .populate("store")
      .exec(function(err, speseDocs) {
        if (err) {
          console.log(err);
          res.send(err);
        }
        res.json(speseDocs);
      });
  } else {
    Spese.find()
      .where("ref_date")
      .gte(req.query.from)
      .where("ref_date")
      .lte(req.query.to)
      .groupby()
      .populate("utente")
      .populate("tipo")
      .populate("store")
      .exec(function(err, speseDocs) {
        if (err) {
          console.log(err);
          res.send(err);
        }
        res.json(speseDocs);
      });
  }
});


router.get("/today", function(req, res, next) {
  /*
  *Il giorno deve essere preso dal campo "giorno di riferimento dello store"
  */
  // var today = new Date();
  var storeObj = Store.findById(req.query.store, function(err, storeData) {
    if (err) {
      console.log(err);
      return null;
    }
    // var refDate = storeData.ref_date;
    // console.log("store: " + req.query.store);



    Spese.find()
      .where("store")
      .equals(req.query.store)
      .where("ref_date")
      // .gte(new Date(refDate.getFullYear(), refDate.getMonth(), refDate.getDate()))
      .gte(storeData.ref_date)
      .populate("utente")
      .populate("tipo")
      .populate("store")
      .exec(function(err, speseDocs) {
        if (err) {
          console.log(err);
          res.send(err);
        }
        res.json(speseDocs);
      });
      
  });
  // console.log("SPESE Request Query:" + JSON.stringify(req.query));
});
module.exports = router;
