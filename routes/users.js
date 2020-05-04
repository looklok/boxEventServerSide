const authController = require('../controllers/authController')
const User = require('../models/user.model')
const router = require('express').Router()


getToken=function(req){
    /*const header = req.headers['authorization'];
    var token = header.split(' ')[1];*/
    return req.body.token;
}


isAuthentified = function(req , res, next){
    var token = getToken(req);
    User.getByToken(token, (err, user)=>{
        if (err){
            return res.status(500).send(err);
        }
        if (user){
            req.user = user;
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
        AuthController.loginWithToken(token, (err, user) =>{
            if (err || !user){
                res.status(403).send(err);
            }else{
                res.send({
                    user : user,
                })
            }
        })

    }
    else{
        AuthController.loginWithPassword(login, password, (err, token, user)=>{
            if (err){
                res.status(400).send(err);
            }else{
                res.send({
                    token : token,
                    user : user,
                })
            }
        })
    }
});

router.get('/', (req, res)=>{

    User.find().then((users)=>{
        res.send(users)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

router.post('/addUser',
    function (req, res) {

      var password = req.body.password;
      var nom = req.body.nom;
      var prenom = req.body.prenom;
      var telephone = req.body.telephone;
      var user = new User();
      if(req.body.login) user.login = req.body.login.toLowerCase();
      user.password = User.generateHash(password);
      user.telephone = telephone;
      user.nom = nom;
      user.prenom = prenom;
      user.departement = req.body.departement;
      
      user.save((err, user)=>{
          if (err){
              res.status(400).send(err);
          }else{
              token = user.generateAuthToken();
              res.send({
                  token : token,
                  user : user
              })
          }
      })
 
});

router.put('/update/:id', (req, res)=>{
    var user = {};
    user.telephone = req.body.telephone;
    user.login = req.body.login;
    user.nom = req.body.nom;
    user.prenom = req.body.prenom;
    user.departement = req.body.departement;

    for(var prop in user) if(! user[prop]) delete user[prop]

    User.updateOne({_id: req.params.id}, user).then(()=>{
        res.send({msg : 'user updated'})
    }).catch(
        (err)=>res.status(400).json(err)
    );
});


router.delete('/:id',  (req,res) =>{
    User.deleteOne({_id : req.params.id})
        .then(res.json('user deleted'))
        .catch(err=> res.status(400).json(err));}
);

module.exports = router;