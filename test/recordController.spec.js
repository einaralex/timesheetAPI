process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require("mongoose");
let config = require('config'); 

//import server from '../server');
import timesheet from '../controllers/recordController.js';
import Record from '../models/recordModel.js';
import server from '../server';

let prefix = '/v1';

// TODO: Look into Mockgoose

let should = chai.should();

chai.use(chaiHttp);

describe('Records', () => {

    let testRecord =  {
        desc: "I'm a test record",
        timeFrom: "00:00",
        timeTo: "00:01"
    }
    describe('/POST newrecord', ()  => {
        it('it should not POST a record without a description', (done) => {
            let record = {
                timeFrom: "11:00",
                timeTo: "22:00"
            }
            chai.request(server)
                .post(prefix + '/record/add')
                .send(record)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('desc');
                    res.body.errors.desc.should.have.property('kind').eql('required');
                  done();
                });
        })
    })
    describe('/POST newrecord', () => {
        it('it should POST a new record', (done) => {
            let record = {
                desc: "I'm a test record",
                timeFrom: "00:02",
                timeTo: "00:02"
            }
            chai.request(server)
                .post(prefix + '/record/add')
                .send(record)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Record successfully added');
                    res.body.newRecord.should.have.property('desc');
                    res.body.newRecord.should.have.property('date');
                    res.body.newRecord.should.have.property('timeFrom');
                    res.body.newRecord.should.have.property('timeTo');
                    testRecord = res.body.newRecord; //set the testRecord to use it again later
                  done();
                })
        })
    })
    describe('/PUT/ record/:id record', () => {
        it('it should UPDATE a record by a given id', (done) => {
            let record = new Record ({ 
                desc: "I'm a test record",
                timeFrom: "00:00",
                timeTo: "00:01",
                story: "123"
            })
                chai.request(server)  
                .put(prefix + '/record/' + testRecord._id)       
                .send({desc: "I'm an updated test record"})
                .end((err, res) => {
                    //console.log(res.body.newRecord)
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Record successfully updated')
                    res.body.newRecord.should.have.property('desc').eql("I'm an updated test record")
                done()
            })
        })
    })


    // this is not asserting anything really
    describe('/GET record', () => {
        it('it should GET all the records', (done) => {
            chai.request(server)
            .get('/v1/records')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            done();
            })
        })
    })

});


