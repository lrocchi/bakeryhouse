var mongoose = require('mongoose');

var costTypeSchema = new mongoose.Schema({
    nome: {type: String, require: true},
    subCategory: {type: String, require: false},
    hasDescription: {type: Boolean, require: true, default: false},
    active: {type: Boolean, require: true, default: true},
    
})



// Export the model
module.exports = mongoose.model('CostType', costTypeSchema);