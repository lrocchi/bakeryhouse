var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('index.html');
});

router.get('/manage', function(req, res, next){
    
    res.redirect("/");
});

router.get('/login', function(req, res, next){
    
    res.redirect("/");
});

module.exports = router;