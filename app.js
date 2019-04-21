const bodyparser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const db = require('./config/database');

//Database Setup
const mongoose = require('mongoose');
const passport = require('passport');

//Routes
const authRoutes = require('./routes/auth');

const host = "0.0.0.0";
const port = process.env.PORT;

mongoose.connect(db.database, { useNewUrlParser: true });
mongoose.connection.on('connected',  () => {
    console.log('Connected to Database');
});


app.get('/', (req,res)=>{
    res.sendFile('public/index.html');
});

app.use('/', authRoutes);

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    // origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    // credentials: true
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

app.listen(process.env.PORT, ()=>{
    console.log(`App Running on port ${port}`);
});

