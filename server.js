var  mongoose = require('mongoose');
var express = require( 'express' );
var path = require( 'path' );
var bodyParser = require ('body-parser');

// var index = require('./routes/index');
var spese = require('./routes/spese');
var users = require('./routes/users');
var stores = require('./routes/store');
var costType = require('./routes/costType');
var balance = require('./routes/balance');
var report = require('./routes/report');
var message = require('./routes/message');

var BalanceSchedule = require('./scheduler');
var ExcelManager = require('./utils/excel');

var config = require('./config/config');
var Logger = require('le_node');


var log = new Logger({
  token:'6c122f92-c9b1-48bb-8ea6-c92c72e4ece2'
});
var port = 3000;

var app = express();


//View Engine

// app.set('views', path.join(__dirname, 'BakeryHouse/src'));
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

//SVILUPPO
//=======================================================================================
mongoose.connect(config.database.mLabDev, {useMongoClient: true, /* other options */});
//=======================================================================================

//ESERCIZIO
//=======================================================================================
// mongoose.connect(config.database.mLab, {useMongoClient: true, /* other options */});
//=======================================================================================



// Set Static Folder

app.use(express.static(path.join(__dirname,'BakeryHouse/dist')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));




app.use('/api/spese', spese);
app.use('/api/balance', balance);
app.use('/api/users', users);
app.use('/api/stores', stores);
app.use('/api/costtype', costType);
app.use('/api/report', report);
app.use('/api/message', message);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'BakeryHouse/dist/index.html'));
  });

 

var listener = app.listen(process.env.PORT || port, function(){
    console.log('Server started on port ' + port);
    log.info('Server started on port ' + port);
})



BalanceSchedule.start();

// ExcelManager.create();