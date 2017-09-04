var  mongoose = require('mongoose');
var express = require( 'express' );
var path = require( 'path' );
var bodyParser = require ('body-parser');

var index = require('./routes/index');
var spese = require('./routes/spese');
var users = require('./routes/users');
var costType = require('./routes/costType');

var config = require('./config/config')
var port = 3000;

var app = express();

//View Engine

// app.set('views', path.join(__dirname, 'BakeryHouse/src'));
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

mongoose.connect(config.database.mLab, {useMongoClient: true, /* other options */});
// Set Static Folder

app.use(express.static(path.join(__dirname,'BakeryHouse/dist')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', index);


app.use('/api/spese', spese);
app.use('/api/users', users);
app.use('/api/costtype', costType);

app.listen(port, function(){
    console.log('Server started on port ' + port);
})