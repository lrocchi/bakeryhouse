var mongoose = require('mongoose');

var costTypeSchema = new mongoose.Schema({
    nome: {type: String, require: true},
    subCategory: {type: String, require: false},
    hasDescription: {type: Boolean, require: true, default: false},
    active: {type: Boolean, require: true, default: true},
    store:{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    percentage: {type: Number, require: true, default: 1}
    
})



// Export the model
module.exports = mongoose.model('CostType', costTypeSchema);