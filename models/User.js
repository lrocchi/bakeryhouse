var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    name: {type: String, lowercase: true, require: true, unique: true},
    surname: {type: String, require: true},
    username: {type: String, unique:true, require:true},
    password: {type: String, require: true},
    email: {type: String, lowercase: true,unique: true},
    ruolo:{
      type: String,
      enum: ['Dipendente','Store Manager','Admin','Super Admin'] ,
      default: 'User'
    },
    store:{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' }

})

// Hash the user's password before inserting a new user
UserSchema.pre('save', function(next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Compare password input to password saved in database
UserSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

// Export the model
module.exports = mongoose.model('User', UserSchema);