let moment = require('moment');
let mongoose = require('mongoose');
let config = require('config'); 

let currentDate = moment().format('YYYY-M-D');
let currentTime = moment().format('HH:mm');
let currentTimeEnd = moment().add(1, 'hours').format('HH:mm');


let RecordSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: 'Enter description'
    },
    date: {
        type: String,
        default: currentDate
    },
    timeFrom: {
        type: String,
        default: currentTime
    },
    timeTo: {
        type: String,
        default: currentTimeEnd
    },
    story: String,
    tags: String
});

export default mongoose.model('Record', RecordSchema, 'records')