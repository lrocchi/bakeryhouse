var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config/config')
var Balance = require('../models/Balance');


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

   router.get('/:epoch/:id_store', function(req, res, next){
    var today = new Date();
    today.setUTCSeconds(req.params.epoch);
    Balance.find({
         date: { $gte : new Date(today.getFullYear(), today.getMonth(), today.getDate())}
       }).where('store').equals(req.params.id_store).sort({date: 'desc'}).populate('user').populate('store').exec(function(err, balanceDocs){
               if(err){ 
                 console.log(err);
                   res.send(err);
               }
               res.json(balanceDocs);
       });
   });

   

   router.post('/', function(req, res, next ) {
    
    
      // Attempt to save the spesa
      Balance.create(req.body,function(err, data) {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            message: 'Rendiconto non aggiunto.',
            data: data
          });
        }
        res.json({
          success: true,
          message: 'Rendiconto aggiunto con successo',
          data: data
        });
      });
    // }
  });

   router.delete("/:id", function (req, res) {
    var id = req.params.id;
    Balance.findByIdAndRemove(id, function (err, data) {
      if (err) {
        return res.json({
          success: false,
          message: 'Errore: Rendiconto non cancellato!',
          data: data
        });
        return;
      }
      res.json({
        success: true,
        message: 'Rendiconto cancellato con successo',
        data: data
      });
    });
  });

  router.put('/:id', function (req, res) {
    var id = req.params.id;
    var obj = req.body;
    Balance.findByIdAndUpdate(id, obj, function (err, data) {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: 'Rendiconto non aggiornato.',
          data: data
        });
      }
      res.json({
        success: true,
        message: 'Rendiconto aggiornato con successo',
        data: data
      });
    });
  
  });


  module.exports = router;