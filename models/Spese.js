var mongoose = require('mongoose');

var spesaSchema = new mongoose.Schema({
    descrizione: {type: String, require: true},
    valore: {type: Number, require: true},
    create_on: {type: Date, default: Date.now},
    update_on: {type: Date, default: Date.now},
    utente: { 
                _id: {type: String, require: true},
                name: {type: String, require: true},
                surname: {type: String, require: true},
                username: {type: String, require: true},
                password: {type: String, require: true}
            } 
})



// Export the model
module.exports = mongoose.model('Spese', spesaSchema);
