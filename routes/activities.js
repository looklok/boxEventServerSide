const router = require('express').Router();
var Activity = require('../models/activity.model');


router.route('/').get((req, res) => {

    Activity.find().then(( activities) => {
        res.send(activities)
    }).catch((err)=> {
        res.status(400).json(err)
    })

});

router.route('/one/:id').get((req, res) =>{
    Activity.findById(req.params.id).then(
        (activities)=>{
            res.send(activities)
            } 
    ).catch((err)=>{
        res.status(400).json(err)
    })
});

router.route('/add').post((req, res) =>{
    
    var activity = new Activity();
    activity.dateDebut = Date.parse(req.body.dateDebut);
    activity.dateFin = Date.parse(req.body.dateFin);
    activity.titre = req.body.titre;
    activity.place = req.body.place;

    activity.save().then(()=>res.status(200).json({msg : 'new activity added'}))
    .catch(err=> res.status(400).json(err));


})

router.route('/:id').delete((req,res) =>{
    Activity.deleteOne({_id : req.params.id})
    .then(res.json('activity deleted'))
    .catch(err=> res.status(400).json(err));
});


router.route('/update/:id').post(
    (req,res)=>{
        var opts = { runValidators: true };
        var activity = {}
        activity.dateDebut = Date.parse(req.body.dateDebut);
        activity.dateFin = Date.parse(req.body.dateFin);
        activity.titre = req.body.titre;
        activity.place = req.body.place;
        for (var prop in activity) if(!activity[prop] ) delete activity[prop];
        
        Activity.updateOne({_id:req.params.id}, activity,opts).then(
            ()=>res.json('activity updated')
        ).catch(
            (err)=>res.status(400).json(err)
        );
    }
    
);

module.exports = router