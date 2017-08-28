var mongoose = require('mongoose');

var spesaSchema = new mongoose.Schema({
    descrizione: {type: String, require: true},
    valore: {type: Number, require: true},
    create_on: {type: Date, default: Date.now},
    update_on: {type: Date, default: Date.now},
    utente: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})



// Export the model
module.exports = mongoose.model('Spese', spesaSchema);
