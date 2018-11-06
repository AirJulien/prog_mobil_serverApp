const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./app/routes');
const mongoose = require('mongoose');

const autoIncrement =require ('mongoose-auto-increment');

const auth = require('./app/middlewares/auth');
auth.init(passport);

app.use(cookieParser())

app.use(morgan('combined'));
app.use(bodyParser.json()); // parse application/json
app.use(cors());
app.use(express.static('static'));

router(app, auth);

var db = require('./config/db');
console.log('dburl : '+db.url)
mongoose.connect(db.url,{ useNewUrlParser: true }); 

app.use(session({secret: db.secret, resave: true, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())

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