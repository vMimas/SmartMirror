const express = require('express');
const User = require('../models/users');
const router = express.Router();
const passport = require('passport');

router.post('/register', (req, res, next)=>{
    addToDB(req, res);
});

async function addToDB(req, res){
    let user = new User({
        email: req.body.email,
        username: req.body.username,
        password: User.hashPassword(req.body.password)
    });

    try{
        doc = await user.save();
        return res.status(201).json(doc);
    } catch(err){
        return res.status(501).json(err);
    }
}

router.post('/login', (req, res, next)=>{
    passport.authenticate('local', (err, user, info)=>{
        if(err){
            console.log(err);
            return res.status(501).json(err);
        }
        if(!user){
            console.log(info);
            return res.status(501).json(info);
        }
        req.logIn(user, (err)=>{
            if(err){
                console.log('37');
                return res.status(501).json(err);
            }else{
                return res.status(200).json({message: 'Login Success'});
            }
        });
    })(req, res, next)
});

router.get('/logout', function(req, res){
    console.log('47');
    req.logout();
    res.redirect('/');
});

module.exports = router;