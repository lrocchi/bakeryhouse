var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var config = require("../config/config");
var Spese = require("../models/Cost");
var Store = require("../models/Store");
var CostType = require("../models/CostType");

var CommonUtils = require("../utils/common");

/* // GET all Spese
router.get("/", function(req, res, next) {
  console.log("REQ.QUERY: " + JSON.stringify(req.query));

  Spese.find(req.query, (err, speseDocs) => {
    if (err) {
      console.log("ERROR:" + err);
      return res.json(err);
    } else {
      console.log(speseDocs);
      return res.json(speseDocs);
    }
  });
}); */

router.get("/", function (req, res, next) {
  const queryParams = req.query;
  const filter = queryParams.filter || '{}',
    pageNumber = parseInt(queryParams.pageNumber) || 0,
    pageSize = parseInt(queryParams.pageSize);

  /* console.log("filter=" + filter);
  console.log("pageNumber=" + pageNumber);
  console.log("pageSize=" + pageSize); */
  // const jsonFilter = filster.json;
  Spese.find(JSON.parse(filter))
    .sort({ create_on: -1 })
    .populate("store")
    .populate("tipo")
    .exec(function (err, docs) {

      // console.log('docs:' + docs);
      const initialPos = pageNumber * pageSize;
      let SpesePage = {};
      let fullSize = 0;
      let total = 0;
      if (docs) {
        // console.log('SpesePage (slice):' + docs.length);
        fullSize = docs.length;
        docs.forEach(el => {
          total += el.valore;
        });
        SpesePage = docs.slice(initialPos, initialPos + pageSize);

      } else {
        SpesePage = docs;
      }
      res.status(200).json({ payload: SpesePage, size: fullSize, totalCost: total });
    });
});


// GET today costs by id_store
router.get("/today", function (req, res, next) {
  /*
  *Il giorno deve essere preso dal campo "giorno di riferimento dello store"
  */
  // var today = new Date();
  var storeObj = Store.findById(req.query.store, function (err, storeData) {
    if (err) {
      console.log(err);
      return null;
    }
    // var refDate = storeData.ref_date;
    if (storeData != null) {
      Spese.find()
        .where("store")
        .equals(req.query.store)
        .where("ref_date")
        // .gte(new Date(refDate.getFullYear(), refDate.getMonth(), refDate.getDate()))
        .gte(storeData.ref_date)
        .populate("utente")
        .populate("tipo")
        .populate("store")
        .exec(function (err, speseDocs) {
          if (err) {
            console.log(err);
            res.send(err);
          }
          res.json(speseDocs);
        })
    }
  });

  // console.log("SPESE Request Query:" + JSON.stringify(req.query));
});

router.post("/", function (req, res, next) {
  if (!req.body.descrizione || !req.body.valore) {
    res.json({
      success: false,
      message: "Please enter descrizione and valore."
    });
  } else {
    // console.log("SPESA  DA AGGIUNGERE: " + JSON.stringify(req.body));
    // Attempt to save the spesa
    var spesa = req.body;
    spesa.fullType = spesa.tipo;
    spesa.fullStore = spesa.store;
    var storeObj = Store.findById(spesa.store._id, function (err, storeData) {
      if (err) {
        console.log(err);
        return null;
      }
      spesa.ref_date = storeData.ref_date;
      Spese.create(spesa, function (err, data) {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            message: "Spesa non aggiunta.",
            data: data
          });
        }
        res.json({
          success: true,
          message: "Spesa aggiunta con successo",
          data: data
        });
      });
    });
  }
});

router.delete("/:id", function (req, res) {
  var id = req.params.id;
  Spese.findByIdAndRemove(id, function (err, data) {
    if (err) {
      return res.json({
        success: false,
        message: "Errore: Tipo spesa non cancellato!",
        data: data
      });
      return;
    }
    res.json({
      success: true,
      message: "Tipo spesa cancellato con successo",
      data: data
    });
  });
});

router.put("/:id", function (req, res) {
  var id = req.params.id;
  var obj = req.body;
  Spesa.findByIdAndUpdate(id, obj, function (err, data) {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: "Spesa non aggiornata.",
        data: data
      });
    }
    res.json({
      success: true,
      message: "Spesa aggiornata con successo",
      data: data
    });
  });
});

module.exports = router;
