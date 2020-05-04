
const User = require('../models/user.model')
const jwt = require('jsonwebtoken');


AuthController = {};

AuthController.loginWithPassword = function(login, password, callback) {
    
    User.findOne({
        login: login.toLowerCase()
    })
      .select("+motDePasse")
      .exec(function(err, user) {
        if (err) {
          return callback(err);
        }else{
        if (user == false) {
          return callback({
              success : false,
              message: "cet login n'existe pas!"
          });
        }else{
        
        if (!user.checkPassword(password)) {
          return callback({
            success : false,
            message: "mot de passe incorrect"
          });
        }
  
        var token = user.generateAuthToken();
    
        delete user[password];
        return callback(null, token, user);
      }}});
  };
  
  AuthController.loginWithToken = function(token, callback){
    jwt.verify(token, process.env.JWT_SECRET, function(err, payload){
      if (err) {
        return callback(err);
      }
      User.findOne({_id: payload.userID}, callback);
    });
  }


  module.exports = AuthController;