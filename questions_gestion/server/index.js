const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./app/routes');
const mongoose = require('mongoose');

const autoIncrement =require ('mongoose-auto-increment');

app.use(morgan('combined'));
app.use(bodyParser.json()); // parse application/json
app.use(cors());

router(app);

var db = require('./config/db');
console.log('dburl : '+db.url)
mongoose.connect(db.url,{ useNewUrlParser: true }); 
mongoose.connection.on('connected', () => {
   console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
   console.log('MongoDB connection error : ' + err);
});

mongoose.connection.on('disconnected', () => {
   console.log('MongoDB connection close')
});


const dbc = mongoose.connection;
autoIncrement.initialize(dbc);

app.listen(port, () => {
    console.log('Listening on ' + port);
});

exports = module.exports = app;