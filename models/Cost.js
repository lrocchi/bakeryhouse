var mongoose = require('mongoose');

var CostType = require("./CostType");
var Store = require("./Store");

var costSchema = new mongoose.Schema({
    descrizione: {type: String, require: true},
    valore: {type: Number, require: true},
    ref_date: {type: Date},
    create_on: {type: Date, default: Date.now},
    update_on: {type: Date, default: Date.now},
    utente: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tipo: { type: mongoose.Schema.Types.ObjectId, ref: 'CostType' },
    fullType: [CostType.schema],
    assegno: {type: Boolean, required:true, default:false},
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    fullStore: [Store.schema]
   
})



// Export the model
module.exports = mongoose.model('Cost', costSchema);
