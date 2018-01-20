var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var config = require("../config/config");
var Balance = require("../models/Balance");
var Store = require("../models/Store");
var Spese = require("../models/Cost");

// GET today balances by id_store, ordered by date descending so it is possible get only the last one
/* router.get('/today/:id_store', function(req, res, next){
    var today = new Date();
    Balance.find({
         date: { $gte : new Date(today.getFullYear(), today.getMonth(), today.getDate())}
       }).where('store').equals(req.params.id_store).sort({day: -1}) .populate('user').populate('store').exec(function(err, balanceDocs){
               if(err){ 
                 console.log(err);
                   res.send(err);
               }
               res.json(balanceDocs);
       });
   }); */

router.get("/:epoch/:id_store", function(req, res, next) {
  /* var today = new Date();
  today.setUTCSeconds(req.params.epoch);
  console.log("req.params.epoch: " + req.params.epoch); */
  var storeObj = Store.findById(req.params.id_store, function(err, storeData) {
    Balance
      .find
      /*  {
      ref_date: {
        $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate())
      }
    } */
      ()
      .where("store")
      .equals(req.params.id_store)
      .where("ref_date")
      .gte(storeData.ref_date)
      .sort({ value: "desc" })
      .populate("user")
      .populate("store")
      .exec(function(err, balanceDocs) {
        if (err) {
          console.log(err);
          res.send(err);
        }
        res.json(balanceDocs);
      });
  });
});

router.post("/", function(req, res, next) {
  var storeObj = Store.findById(req.body.store._id, function(err, storeData) {
    if (err) {
      console.log(err);
      return null;
    }
    // console.log("STORE:" + JSON.stringify(storeData));
    var balance = req.body;
    balance.store = storeData;
    balance.ref_date = storeData.ref_date;
    // console.log("BALANCE:" + JSON.stringify(balance));
    // Attempt to save the spesa

    var myDate = new Date(balance.ref_date);
    var prevRefDate = new Date(myDate.setTime(myDate.getTime() - 1 * 86400000));

    Balance.find()
      .where("store")
      .equals(balance.store)
      .where("ref_date")
      .gte(prevRefDate)
      .sort({ value: "desc" })
      .exec(function(err, balanceDocs) {
        if (err) {
          console.log(err);
          res.send(err);
        }
        if (balanceDocs[0].capital) {
          balance.prevCapital = balanceDocs[0].capital;
        }else{
          balance.prevCapital = 0;
        }
        /** calcoloincasso rafa */
        var refDate = new Date(balance.ref_date);

        Spese.aggregate(
          [
            {
              $match: {
                store: balance.store._id,
                ref_date: refDate
              }
            },

            {
              $group: {
                _id: "$store",
                total: { $sum: "$valore" }
              }
            }
          ],
          function(err, results) {
            if (err) {
              return res.json({
                success: false,
                message: "Errore: Rendiconto non cancellato!",
                data: data
              });
              return;
            }
            balance.speseTotali = results.total;
            var nRafa = balance.cassa;
            if (balance.riserva) {
              nRafa += balance.riserva;
            }
            if (balance.prevCapital) {
              nRafa -= balance.prevCapital;
            }

            if (balance.speseTotali) {
              nRafa -= balance.speseTotali;
            }

            if (balance.pos) {
              nRafa += balance.pos;
            }
            if (balance.flash) {
              nRafa -= balance.flash;
            }

            balance.rafa = nRafa;

            Balance.create(balance, function(err, data) {
              // console.log("REST:" + JSON.stringify(data));
              if (err) {
                console.log(err);
                return res.json({
                  success: false,
                  message: "Rendiconto non aggiunto.",
                  data: data
                });
              }
              res.json({
                success: true,
                message: "Rendiconto aggiunto con successo",
                data: data
              });
            });
          }
        );
      });
    /*
    *Se è chiususa avanza la ref_date nello Store
    */
    if (balance.type === "Chiusura") {
      var myDate = new Date(balance.ref_date);
      var newRefDate = new Date(
        myDate.setTime(myDate.getTime() + 1 * 86400000)
      );
      Store.findById(storeData._id, function(err, data) {
        if (err) {
          console.log(err);
        }
        data.ref_date = newRefDate;
        data.save();
      });
    }
  });

  // }
});

router.delete("/:id", function(req, res) {
  var id = req.params.id;
  Balance.findByIdAndRemove(id, function(err, data) {
    if (err) {
      return res.json({
        success: false,
        message: "Errore: Rendiconto non cancellato!",
        data: data
      });
      return;
    }
    res.json({
      success: true,
      message: "Rendiconto cancellato con successo",
      data: data
    });
  });
});

router.put("/:id", function(req, res) {
  var id = req.params.id;
  var obj = req.body;
  Balance.findByIdAndUpdate(id, obj, function(err, data) {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: "Rendiconto non aggiornato.",
        data: data
      });
    }
    res.json({
      success: true,
      message: "Rendiconto aggiornato con successo",
      data: data
    });
  });
});

module.exports = router;
