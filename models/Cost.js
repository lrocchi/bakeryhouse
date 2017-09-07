var mongoose = require('mongoose');

var costSchema = new mongoose.Schema({
    descrizione: {type: String, require: true},
    valore: {type: Number, require: true},
    create_on: {type: Date, default: Date.now},
    update_on: {type: Date, default: Date.now},
    utente: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tipo: { type: mongoose.Schema.Types.ObjectId, ref: 'CostType' },
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }
})



// Export the model
module.exports = mongoose.model('Cost', costSchema);
