var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config/config')
var Spese = require('../models/Cost');
var CostType = require('../models/CostType');



// GET all Spese
router.get('/', function (req, res, next) {

  console.log("REQ.QUERY: " + JSON.stringify(req.query));

  
  
  Spese.find(req.query, (err, speseDocs) => {
    if (err) {
      console.log('ERROR:' + err);
      return res.json(err);
    } else {
      console.log(speseDocs);
      return res.json(speseDocs);
    }
  });
  /*  if (req.query) {
     Spese.find( req.query, (err, speseDocs) => {
       console.log(speseDocs);
       return res.json(speseDocs);
     });
   } else {
     Spese.find({}, (err, speseDocs) => {
       console.log(speseDocs);
       return res.json(speseDocs);
     });
 
   } */
});



// GET today costs by id_store
router.get('/today', function (req, res, next) {
  var today = new Date();
  console.log("ID_STORE:" + JSON.stringify(req.query));
  Spese.find(req.query)
  .where('create_on').gte(new Date(today.getFullYear(), today.getMonth(), today.getDate())).populate('utente').populate('tipo').populate('store').exec(function (err, speseDocs) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.json(speseDocs);
  });
});


router.post('/', function (req, res, next) {

  if (!req.body.descrizione || !req.body.valore) {
    res.json({
      success: false,
      message: 'Please enter descrizione and valore.'
    });
  } else {

    console.log("SPESA  DA AGGIUNGERE: " + JSON.stringify(req.body));
    // Attempt to save the spesa
    Spese.create(req.body, function (err, data) {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: 'Spesa non aggiunta.',
          data: data
        });
      }
      res.json({
        success: true,
        message: 'Spesa aggiunta con successo',
        data: data
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
        message: 'Errore: Tipo spesa non cancellato!',
        data: data
      });
      return;
    }
    res.json({
      success: true,
      message: 'Tipo spesa cancellato con successo',
      data: data
    });
  });
});

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var obj = req.body;
  Spesa.findByIdAndUpdate(id, obj, function (err, data) {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: 'Spesa non aggiornata.',
        data: data
      });
    }
    res.json({
      success: true,
      message: 'Spesa aggiornata con successo',
      data: data
    });
  });

});




module.exports = router;