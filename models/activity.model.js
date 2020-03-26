const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const activitySchema = new Schema({
    time: {
        type: Date,
    },
    responsableID : String,
    nbOrganisateur : Number,
    organisateurs : [String],
    titre : String,
    description : String,
    departement :{
        type : String,
        enum :{
            values : ['logistic', 'communication', 'design', 'developpement',]
        }
    },

})
const model =  mongoose.model('activity', activitySchema);
module.exports =model