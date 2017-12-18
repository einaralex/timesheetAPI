let express = require('express');
let moment = require('moment');
import Record from '../models/recordModel';

const records = express();

records.add_a_record = (req, res) => {

  let newRecord = new Record({
    desc: req.body.desc,
    timeFrom: req.body.timeFrom,
    timeTo: req.body.timeTo,
    story: req.body.story
  })

  newRecord.save((err, record) => {
    if (err) {
      res.send(err)
      //res.status(500).send(err.message)
    }
    else {
      //res.send(record)
      res.json({ message: "Record successfully added", newRecord })
    }
  });
};

// Lists all records in RecordSchema with a query possibility ?timeFrom=08:00 t.d.
records.list_all_records = (req, res) => {

  Record.find(req.query).lean().exec((err, records) => {

    // map through every record 
    records: records.map(records => ({
      ...records,
    }))
    // Send a 500 Status Code and the error message if it fails
    if (err) {
      res.status(500).send(err.message)
    }
    else {
      res.send(records)
    }
  })
};


records.get_record_by_id = (req, res) => {

  let id = req.params.id;

  Record.findOne({ _id: id })
    .exec((err, record) => {
      if (err) {
        res.status(500).send(err.message)
      }
      else if (!record) { return res.send(404) }
      else {
        res.send(record)
      }
    });
};

records.update_record_by_id = (req, res) => {

  let newRecord = new Record({
    desc: req.body.desc,
    timeFrom: req.body.timeFrom,
    timeTo: req.body.timeTo,
    story: req.body.story
  })

  let id = req.params.id;

  Record.findByIdAndUpdate(id, req.body, (err, record) => {
    //console.log(req.body);
    if (err) {
      res.status(500).send(err.message)
    }
    else if (!record) { return res.send(404) }
    else {
      res.json({ message: "Record successfully updated", newRecord })
    }
  })
};

records.remove_record_by_id = (req, res) => {

  let id = req.params.id;

  Record.findOneAndRemove({ _id: id })
    .exec((err, record) => {
      if (err) {
        res.status(500).send(err.message)
      }
      else {
        res.send(record)
      }
    });
};

export default records;
