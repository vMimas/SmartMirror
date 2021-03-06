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

//For testing with a local db.
//mongoose.connect("mongodb://localhost/magicMirror", { useNewUrlParser: true });

mongoose.connect("mongodb+srv://dbAdmin:mirrorPasswd@cluster0-ubbfw.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });

mongoose.connection.on('connected',  () => {
    console.log('Connected to Database');
});

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

/**app.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    credentials: true
}));**/

app.use(express.static(path.join(__dirname, 'public')));
// for any route, express renders the index.html page in 'dist'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

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

//MUST BE AFTER passport
app.use('/', authRoutes);

//NEED 3000 for testing on localhost.
const port = process.env.PORT || 3000;

//Leaving as a variable 'port' allows testing on localhost
app.listen(port, ()=>{
    console.log(`App Running on port ${port}`);
});
