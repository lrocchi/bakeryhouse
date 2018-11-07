var mongoose = require('mongoose');

var balanceSchema = new mongoose.Schema({

    type:{
        type: String,
        enum: ['Pranzo','Pomeriggio','Cena','Chiusura'] ,
        },
    value: {type: Number, default: 0},
    create_on: {type: Date, default: Date.now, required: true},
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    store:{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    ref_date:{type: Date,  default: Date.now, required: true},
    cassa: {type: Number, require: true},
    pos: {type: Number, require: true},
    ticket: {type: Number, require: true},
    memoCredit: {type: Number},
    capital: {type: Number},
    prevCapital: {type: Number},
    flash: {type: Number},
    rafa: {type: Number},
    speseTotali: {type: Number},
    riserva: {type: Number},
    tavoliAperti: {type: Number},
    comp_filename: {type: String},
    compensazione: {type: Number}

})



// Export the model
module.exports = mongoose.model('Balance', balanceSchema);