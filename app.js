const bodyparser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

//Database Setup
const mongoose = require('mongoose');
const passport = require('passport');

//Routes
const authRoutes = require('./routes/auth');

mongoose.connect("mongodb://localhost/magicMirror", { useNewUrlParser: true });
mongoose.connection.on('connected',  () => {
    console.log('Connected to Database');
});

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json());
app.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    credentials: true
}));

//Passport Setup
app.use(require("express-session")({
    secret: 'Expecto potronum',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 36000000,
        httpOnly: false,
        secure: false
    }
}));
require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());


app.use('/', authRoutes);


app.get('/', (req, res) => {
    res.send('Made it to Root');
});



app.listen('3000', ()=>{
    console.log('App Running');
});