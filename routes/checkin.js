const Checkin = require('../models/checkin.model');
const router = require('express').Router();

router.get("/", (req, res)=>{
    Checkin.find().then((checkin)=>{
        res.send(checkin)
    }).catch((err)=>{
        res.status(400).send(err);
    })
})


router.post('/add', (req, res) =>{
    var checkin = new Checkin();
    checkin.activity = req.body.activity;
    checkin.id = req.body.id;
    checkin.save().then(()=>res.status(200).json({msg : 'participant checked in'}))
    .catch(err=> res.status(400).json(err));
})

router.route('/:id').delete((req,res) =>{
    Checkin.deleteOne({_id : req.params.id})
    .then(res.json('check-in cancelled'))
    .catch(err=> res.status(400).json(err));
});


module.exports = router;