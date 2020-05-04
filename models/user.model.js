const mongoose = require('mongoose'),
      bcrypt     = require('bcrypt'),
      jwt = require('jsonwebtoken');


var Schema = mongoose.Schema;

const userSchema = new Schema({
    
    nom : String,
    prenom : String,
    telephone : String,
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
    departement :{
        type : String,
        enum :{
            values : ['logistic', 'communication', 'design', 'developpement',]
        }
    },
    

});


userSchema.methods.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateAuthToken = function(){
    return jwt.sign({userID : this._id.toString()}, process.env.JWT_SECRET,  { expiresIn: 5 * 60 * 60 });
};


userSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync( password , bcrypt.genSaltSync(10));
};

userSchema.statics.getByToken = function(token, callback){
    jwt.verify(token, process.env.JWT_SECRET, function(err, payload){
      if (err) {
        return callback(err);
      }
      this.findOne({_id: payload.userID}, callback);
    }.bind(this));
};
const model =  mongoose.model('user', userSchema);
module.exports =model