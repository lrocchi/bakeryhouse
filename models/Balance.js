var mongoose = require('mongoose');

var balanceSchema = new mongoose.Schema({

    type:{
        type: String,
        enum: ['12','16','20','Chiusura'] ,
        },
    date: {type: Date, default: Date.now},
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    store:{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
  
    cassa: {type: Number, require: true},
    pos: {type: Number, require: true},
    ticket: {type: Number, require: true},
    memoCredit: {type: Number, require: true}

})



// Export the model
module.exports = mongoose.model('Balance', balanceSchema);