var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config/config')
var Store = require('../models/Store');


// GET all Stores
router.get('/', function (req, res) {
  Store.find({}, function (err, users) {
    res.json(users);
  });
});

// GET ONLY active Store
router.get('/active', function (req, res, next) {
  Store.where("active").equals(true).exec(function (err, storeDoc) {
    // console.log(costTypeDoc);
    return res.json(storeDoc);
  });
});


router.post('/', function (req, res, next) {

  if (!req.body.nome || !req.body.piva) {
    res.json({
      success: false,
      message: 'Please enter NOME and P.IVA.'
    });
  } else {

    console.log("STORE  DA AGGIUNGERE: " + JSON.stringify(req.body));
    // Attempt to save the spesa
    Store.create(req.body, function (err, data) {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: 'Punto vendita non aggiunto.',
          data: data
        });
      }
      res.json({
        success: true,
        message: 'Punto vendita aggiunto con successo',
        data: data
      });
    });
  }
});

router.get('/:id', function (req, res) {
  Store.findById( req.params.id, function (err, store) {
    res.json(store);
  });
});

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var obj = req.body;
  Store.findByIdAndUpdate(id, obj, function (err, data) {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: 'Punto vendita non aggiunto.',
        data: data
      });
    }
    res.json({
      success: true,
      message: 'Punto vendita aggiunto con successo',
      data: data
    });
  });


});

router.delete("/:id", function (req, res) {
  var id = req.params.id;
  Store.findByIdAndRemove(id, function (err, data) {
    if (err) {
      return res.json({
        success: false,
        message: 'Errore: Punto vendita non cancellato!',
        data: data
      });
      return;
    }
    res.json({
      success: true,
      message: 'Punto vendita cancellato con successo',
      data: data
    });
  });
});

module.exports = router;