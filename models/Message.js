var mongoose = require('mongoose');



var messageSchema = new mongoose.Schema({
    
    subject: {type: String, require: true},
    message: {type: String, require: true},
    htmlmessage: {type: String, require: true},
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: false },
    type: { type: String, enum: ['info', 'warning', 'alert'], default: 'alert' },
    unread: {type: Boolean, default: true, required: true},
    create_on: {type: Date, default: Date.now, required: true}   
    
})



// Export the model
module.exports = mongoose.model('Message', messageSchema);
