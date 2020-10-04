const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const crypto = require('crypto');
const bodyParser = require('body-parser');

// const index = require('./routes/index');
const spese = require('./routes/spese');
const users = require('./routes/users');
const stores = require('./routes/store');
const costType = require('./routes/costType');
const balance = require('./routes/balance');
const report = require('./routes/report');
const message = require('./routes/message');

const BalanceSchedule = require('./scheduler');
const ReportScheduler = require('./ReportScheduler');
const WeeklyReportScheduler = require('./WeeklyReportScheduler');

// const ExcelManager = require('./utils/excel');

const config = require('./config/config');
const Logger = require('le_node');


const log = new Logger({
  token: '6c122f92-c9b1-48bb-8ea6-c92c72e4ece2'
});
const port = 3000;

const app = express();


//View Engine

// app.set('views', path.join(__dirname, 'BakeryHouse/src'));
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

//SVILUPPO
//=======================================================================================
// const dbConnectionUrl = config.database.mLabDev;
const dbConnectionUrl = config.database.atlasDEV;
// mongoose.connect(config.database.mLabDev, {useMongoClient: true, /* other options */});
//=======================================================================================

//ESERCIZIO
//=======================================================================================
// const dbConnectionUrl = config.database.mLab;
// mongoose.connect(config.database.mLab, {useMongoClient: true, /* other options */});
//=======================================================================================


// mongoose.connect(dbConnectionUrl, {useMongoClient: true, /* other options */});
mongoose.connect(dbConnectionUrl, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
const conn = mongoose.connection;
// conn.options = {useUnifiedTopology: true};
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
const gfs = Grid(mongoose.connection, mongoose.mongo);

// Set Static Folder

app.use(express.static(path.join(__dirname, 'BakeryHouse/dist')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

let fileName = null;

// Setting up the storage element
const storage = GridFsStorage({
  // gfs : gfs,
  url: dbConnectionUrl,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        this.filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: this.filename,
          bucketName: 'uploads'
        };
        console.log(this.filename);
        resolve(fileInfo);
      });
    });
  }
});


// Multer configuration for single file uploads
const upload = multer({
  storage: storage
}).single('file');

// Route for file upload
app.post('/api/upload', (req, res) => {
  console.log('UPLOAD');
  upload(req,res, (err) => {
    // console.log(res);
  
      if(err){
           res.json({error_code:1,err_desc:err});
           return;
      }
      res.json({error_code:0, error_desc: null, file_uploaded: true, file_name: this.filename});
  });
});


// Allows cross-origin domains to access this API
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin' , 'http://localhost:' + port);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.append('Access-Control-Allow-Credentials', true);
  next();
});


// Downloading a single file
app.get('/api/file/:filename', (req, res) => {
  gfs.collection('uploads'); //set collection name to lookup into

  /** First check if file exists */
  gfs.files.find({filename: req.params.filename}).toArray(function(err, files){
      if(!files || files.length === 0){
          return res.status(404).json({
              responseCode: 1,
              responseMessage: "error"
          });
      }
      // create read stream
      const readstream = gfs.createReadStream({
          filename: files[0].filename,
          root: "uploads"
      });
      // set the proper content type 
      res.set('Content-Type', files[0].contentType)
      // Return response
      return readstream.pipe(res);
  });
});




app.use('/api/spese', spese);
app.use('/api/balance', balance);
app.use('/api/users', users);
app.use('/api/stores', stores);
app.use('/api/costtype', costType);
app.use('/api/report', report);
app.use('/api/message', message);

// Catch all other routes and return the index file
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'BakeryHouse/dist/index.html'));
});



/* const today = new Date();
const y = today.getFullYear();
const m = today.getMonth(); 
const d = today.getDate()


const fromDate = new Date(y, m, d - 7, 0, 0, 0, 0);
const toDate = new Date(y, m, d, 0, 0, 0, 0); */


// const fromDate = new Date(2019, 5, 1, 0, 0, 0, 0);
// const toDate = new Date(2019, 5, 31, 0, 0, 0, 0);


// ExcelManager.create(fromDate, toDate, "Luca.xlsx"); 



const listener = app.listen(process.env.PORT || port, function () {
  console.log('Server started on port ' + port);
  log.info('Server started on port ' + port);
});



BalanceSchedule.start();

ReportScheduler.startMonthly();
WeeklyReportScheduler.startWeekly();



