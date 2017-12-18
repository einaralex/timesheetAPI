let morgan = require('morgan');
let mongoose = require('mongoose');
let config = require('config'); 
let express = require('express');
//let router = require('./routes/timesheetRouter');
import router from './routes/recordRouter';

// Initialize http server
const app = express();



// use the config JSON files to hide and control the mongoose connection string
mongoose.connect(config.DBHost, {
    useMongoClient: true,
  });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

app.use(morgan('combined'));

// Use v1 as prefix for all API endpoints
app.use('/v1', router);

// incase of 404
app.use( (req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

// Launch the server on port 3000
const server = app.listen(3000, "localhost", () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});

export default server;