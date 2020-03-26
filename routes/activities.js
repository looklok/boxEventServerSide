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
            res.json(activities)
            } 
    ).catch((err)=>{
        res.status(400).json(err)
    })
});

router.route('/add').post((req, res) =>{
    
    var activity = new Activity();
    activity.time = Date.parse(req.body.time);
    activity.responsableID = req.body.responsableID;
    activity.nbOrganisateur = Number(req.body.nbOrganisateur);
    activity.organisateurs = req.body.organisateurs;
    activity.titre = req.body.titre;
    activity.description = req.body.description;
    activity.departement = req.body.departement;

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
        var time = Date.parse(req.body.time)
        if(time) activity.time = time;
        if (req.body.responsableID) activity.responsableID = req.body.responsableID;
        if (req.body.nbOrganisateur) activity.nbOrganisateur = Number(req.body.nbOrganisateur)
        if (req.body.organisateurs) activity.organisateurs = req.body.organisateurs;
        if (req.body.titre) activity.titre = req.body.titre;
        if (req.body.description) activity.description = req.body.description;
        if (req.body.departement) activity.departement = req.body.departement;
        console.log(activity)
        Activity.updateOne({_id:req.params.id}, activity,opts).then(
            ()=>res.json('activity updated')
        ).catch(
            (err)=>res.status(400).json(err)
        );
    }
    
);

module.exports = router