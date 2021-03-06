const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');
const https = require('https');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./app/routes');
const mongoose = require('mongoose');

const autoIncrement = require ('mongoose-auto-increment');

const auth = require('./app/middlewares/auth');

app.use(cookieParser())

app.use(morgan('combined'));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.static('static'));

router(app);

var db = require('./config/db');
console.log('dburl : '+db.url)
mongoose.connect(db.url,{ useNewUrlParser: true });

app.use(passport.initialize())
app.use(passport.session())
auth.init(passport);

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

https.createServer({
   key: fs.readFileSync('./config/private.key'),
   cert: fs.readFileSync('./config/smartacus.crt'),
   requestCert: false,
   rejectUnauthorized: false
 }, app).listen(port, () => {
   console.log('Listening on ' + port);
});

exports = module.exports = app;
