const mongoose = require('mongoose'),
      bcrypt     = require('bcrypt'),
      jwt = require('jsonwebtoken');


var Schema = mongoose.Schema;

const adminSchema = new Schema({
    
    login: {
        type: String,
        min: 1,
        max: 100,
      },
    
    password: {
        type: String,
        required: true,
       // select: false, // for default projection
      },
    

});


adminSchema.methods.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

adminSchema.methods.generateAuthToken = function(){
    return jwt.sign({adminID : this._id.toString()}, process.env.JWT_SECRET,  { expiresIn: 5 * 60 * 60 });
};


adminSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync( password , bcrypt.genSaltSync(10));
};

adminSchema.statics.getByToken = function(token, callback){
    jwt.verify(token, process.env.JWT_SECRET, function(err, payload){
      if (err) {
        return callback(err);
      }
      this.findOne({_id: payload.adminID}, callback);
    }.bind(this));
};
const model =  mongoose.model('admin', adminSchema);
module.exports =model