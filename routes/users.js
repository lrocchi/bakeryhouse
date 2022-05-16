var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('../config/config')
var User = require('../models/User');





// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/auth', (req, res) => {
  User.findOne({
    username: req.body.username
  }).populate('store').exec(function (err, user) {
    if (err) throw err;

    if (!user) {
      res.send({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(user.toJSON(), config.auth.secret, {
            expiresIn: "1H"
          });
          res.json({
            success: true,
            message: 'Authentication successfull',
            token
          });
        } else {
          res.send({
            success: false,
            message: 'Authentication failed. Passwords did not match.'
          });
        }
      });
    }
  });
});


// GET all Users
router.get('/', function (req, res) {
  User.find().populate('store').exec({}, function (err, users) {
    res.json(users);
  });
});

// GET all Users by store
router.get('/:store_id', function (req, res) {
  User.find({store: req.params.store_id}).populate('store').exec({}, function (err, users) {
    res.json(users);
  });
});

// GET single User by id
router.get('/:id', function (req, res, next) {
  User.findOne({
    _id: mongoosedb.ObjectId(req.params.id)
  }).populate('store').exec(function (err, userDocs) {
    if (err) {
      res.send(err);
    }

    res.json(userDocs);
  });
});



// Register new users
router.post('/register', function (req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({
      success: false,
      message: 'Please enter email and password.'
    });
  } else {
    var newUser = new User({
      USERNAME: req.body.username,
      password: req.body.password
    });

    // Attempt to save the user
    newUser.save(function (err) {
      if (err) {
        return res.json({
          success: false,
          message: 'That email address already exists.'
        });
      }
      res.json({
        success: true,
        message: 'Successfully created new user.'
      });
    });
  }
});


router.post('/', function (req, res, next) {

  /*  if (!req.body.nome || !req.body.piva) {
    res.json({
      success: false,
      message: 'Please enter NOME and P.IVA.'
    });
  } else {  */

  // console.log("USER  DA AGGIUNGERE: " + JSON.stringify(req.body));
  // Attempt to save the spesa
  User.create(req.body, function (err, data) {
    if (err) {
      console.log(err);

      var errorMessage;
      if (err.code = 11000) {
        if (err.message.indexOf('bkhouse.users.$username') > -1) {
          errorMessage = 'Username già esistente';
        } else if (err.message.indexOf('bkhouse.users.$email')) {
          errorMessage = 'Email già utilizzata per un altro utente';
        } else {
          errorMessage = err.message;
        }

      } else {
        errorMessage = err.message;
      }
      return res.json({
        success: false,
        message: 'Utente non aggiunto.',
        data: errorMessage
      });
    }
    res.json({
      success: true,
      message: 'Utente aggiunto con successo',
      data: data
    });
  });
  // }
});

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var obj = req.body;
  /* User.findByIdAndUpdate(id, obj, function (err, data) {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: 'Utente non aggiornato.',
        data: data
      });
    }
    res.json({
      success: true,
      message: 'Utente aggiornato con successo',
      data: data
    });
  }); */

  User.findById(id, function (err, doc) {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: 'Utente non aggiornato.',
        data: data
      });
    }
    doc.name = obj.name;
    doc.surname = obj.surname;
    doc.username = obj.username;
    // doc.password = obj.password;
    doc.email = obj.email;
    if (obj.ruolo) {
      doc.ruolo = obj.ruolo;
    }
    if (obj.store) {
      doc.store = obj.store;
    }
    if (obj.active) {
      doc.active = obj.active;
    }
    doc.save(function (err) {

      if (err) {
        console.log('User Update: ', err);
        var errorMessage;
        if (err.code = 11000) {
          if (err.message.indexOf('bkhouse.users.$username') > -1) {
            errorMessage = 'Username già esistente';
          } else if (err.message.indexOf('bkhouse.users.$email')) {
            errorMessage = 'Email già utilizzata per un altro utente';
          } else {
            errorMessage = err.message;
          }

        } else {
          errorMessage = err.message;
        }
        return res.json({
          success: false,
          message: errorMessage
        });
      }
      res.json({
        success: true,
        message: 'Utente modificato con successo',
        data: doc
      });
    });
  });

});

router.delete("/:id", function (req, res) {
  var id = req.params.id;
  User.findByIdAndRemove(id, function (err, data) {
    if (err) {
      return res.json({
        success: false,
        message: 'Errore: Utente non cancellato!',
        data: data
      });
      return;
    }
    res.json({
      success: true,
      message: 'Utente cancellato con successo',
      data: data
    });
  });
});

module.exports = router;