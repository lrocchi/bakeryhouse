var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config/config')
var CostType = require('../models/CostType');



// GET all CostType
router.get('/', function (req, res, next) {
  // console.log("REQ.QUERY" + req.query);
  CostType.find(req.query).sort('nome').exec((err, costTypeDoc) => {
    //console.log(costTypeDoc);
    return res.json(costTypeDoc);
  });
});


// GET Distinct Categories
router.get('/categories', function (req, res, next) {
  CostType.find(req.query).distinct('nome', function (err, costTypeDoc) {
    console.log(costTypeDoc);
    return res.json(costTypeDoc);
  });
});

// GET specific SubCategories
router.get('/categories/:category', function (req, res, next) {
  CostType.where("nome").equals(req.params.category).exec(function (err, costTypeDoc) {
    console.log(costTypeDoc);
    return res.json(costTypeDoc);
  });
});


router.post('/', function (req, res, next) {

  if (!req.body.nome) {
    res.json({
      success: false,
      message: 'Please enter nome'
    });
  } else {


    // Attempt to save the spesa
    CostType.create(req.body, function (err, data) {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: 'Errore: Tipo spesa non aggiunta!',
          data: data
        });
      }
      res.json({
        success: true,
        message: 'Tipo spesa aggiunta con successo',
        data: data
      });
    });
  }
});

router.delete("/:id", function (req, res) {
  var id = req.params.id;
  CostType.findByIdAndRemove(id, function (err, data) {
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


module.exports = router;