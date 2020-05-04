const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const checkinSchema = new Schema({
    id : {
        type : String,
        required : true,
    },
    activity : {
        type : String,
        required : true,
    },
    checkedInAt : {
        type: Date,
        default : ()=>Date.now(),
    }
})

const model =  mongoose.model('checkin', checkinSchema);
module.exports =model