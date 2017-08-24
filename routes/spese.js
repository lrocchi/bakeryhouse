let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let config = require('../config/config')
var Spese = require('../models/Spese');



// GET all Spese
router.get('/', function(req, res, next){
    Spese.find({}, (err, speseDocs) =>{
            console.log(speseDocs);
            return res.json(speseDocs);
    });
});

// GET single Spese by id
/* router.get('/:id', function(req, res, next){
    Spese.findOne({_id: mongoosedb.ObjectId(req.params.id)}, function(err, spesa){
            if(err){ 
                res.send(err);
            }

            res.json(spesa);
    });
}); */

// GET single Spese by id
router.get('/today', function(req, res, next){
 let today = new Date();
  Spese.find({"create_on" : { "$gte" : new Date(today.getFullYear(), today.getMonth(), today.getDate())}}, function(err, speseDocs){
            if(err){ 
              console.log(err);
                res.send(err);
            }
            res.json(speseDocs);
    });
});


router.post('/', function(req, res, next ) {
  
   if (!req.body.descrizione || !req.body.valore) {
    res.json({
      success: false,
      message: 'Please enter descrizione and valore.'
    });
  } else { 
    
    
    // Attempt to save the spesa
    Spese.create(req.body,function(err, data) {
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

module.exports = router;