var mongoose = require('mongoose');

var storeSchema = new mongoose.Schema({

    nome: {type: String, require: true},
    indirizzo: {type: String, require: true},
    piva: {type: String, require: true,  unique: true},
    direttore: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    

})



// Export the model
module.exports = mongoose.model('Store', spesaSchema);
