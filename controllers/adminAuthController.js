
const Admin = require('../models/admin.model')
const jwt = require('jsonwebtoken');


AuthController = {};

AuthController.loginWithPassword = function(login, password, callback) {
    
    Admin.findOne({
        login: login.toLowerCase()
    })
      .exec(function(err, admin) {
        if (err) {
          return callback(err);
        }else{
        if (admin == false) {
          return callback({
              success : false,
              message: "cet login n'existe pas!"
          });
        }else{
        
        if (!admin.checkPassword(password)) {
          return callback({
            success : false,
            message: "mot de passe incorrect"
          });
        }
  
        var token = admin.generateAuthToken();
    
        delete admin[password];
        return callback(null, token, admin);
      }}});
  };
  
  AuthController.loginWithToken = function(token, callback){
    jwt.verify(token, process.env.JWT_SECRET, function(err, payload){
      if (err) {
        return callback(err);
      }
      Admin.findOne({_id: payload.adminID}, callback);
    });
  }


  module.exports = AuthController;