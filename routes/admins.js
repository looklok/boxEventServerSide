const AuthController = require('../controllers/adminAuthController')
const Admin = require('../models/admin.model')
const router = require('express').Router()


getToken=function(req){
    /*const header = req.headers['authorization'];
    var token = header.split(' ')[1];*/
    return req.body.token;
}


isAdminAuthentified = function(req , res, next){
    var token = getToken(req);
    Admin.getByToken(token, (err, admin)=>{
        if (err){
            return res.status(500).send(err);
        }
        if (admin){
            req.admin = admin;
            return next();

        }
        return res.status(403).send({
          msg : "go away"
        });

    })
} 


router.route('/login').post((req, res)=>{
    var login = req.body.login;
    var password = req.body.password;
    var token = getToken(req);

    if (token){
        AuthController.loginWithToken(token, (err, admin) =>{
            if (err || !admin){
                res.status(403).send(err);
            }else{
                res.send({
                    admin : admin,
                })
            }
        })

    }
    else{
        AuthController.loginWithPassword(login, password, (err, token, admin)=>{
            if (err){
                res.status(400).send(err);
            }else{
                res.send({
                    token : token,
                    admin : admin,
                })
            }
        })
    }
});

router.get('/', (req, res)=>{

    Admin.find().then((admins)=>{
        res.send(admins)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

router.post('/addAdmin',
    function (req, res) {

      
      var admin = new Admin();
      if(req.body.login) admin.login = req.body.login.toLowerCase();
      admin.password = Admin.generateHash(req.body.password);
     
      
      admin.save((err, admin)=>{
          if (err){
              res.status(400).send(err);
          }else{
              token = admin.generateAuthToken();
              res.send({
                  token : token,
                  admin : admin
              })
          }
      })
 
});

router.delete('/:id',  (req,res) =>{
    Admin.deleteOne({_id : req.params.id})
        .then(res.json('admin deleted'))
        .catch(err=> res.status(400).json(err));}
);

module.exports = router;