const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const activitySchema = new Schema({
    dateDebut: {
        type: Date,
    },
    dateFin: {
        type: Date,
    },
    titre : String,
    place : String,

})
const model =  mongoose.model('activity', activitySchema);
module.exports =model