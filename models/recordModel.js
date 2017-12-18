let moment = require('moment');
let mongoose = require('mongoose');
let config = require('config'); 

let currentDate = moment().format('YYYY-M-D');
let currentTime = moment().format('HH:mm');
let currentTimeEnd = moment().add(1, 'hours').format('HH:mm');

var timeValidation = [/^(\d{2}:\d{2})$/, 'Not a valid time format 00:00'];

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
        match: timeValidation,
        default: currentTime
    },
    timeTo: {
        type: String,
        match: timeValidation,
        default: currentTimeEnd
    },
    story: String,
    tags: String
});

export default mongoose.model('Record', RecordSchema, 'records')