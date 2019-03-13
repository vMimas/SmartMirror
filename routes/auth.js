const express = require('express');
const User = require('../models/users');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

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
    passport.authenticate('local', {session: false}, (err, user, info)=>{
        if(err){
            console.log('line 30' + err);
            return res.status(501).json(err);
        }
        if(!user){
            console.log(info);
            return res.status(501).json(info);
        }
        req.logIn(user, {session: false}, (err)=>{
            if(err){
                return res.status(501).json(err);
            }else{
                const token = jwt.sign({data:user}, config.secret, {
                    expiresIn: 604800 //1 week in seconds

                });
                res.status(200).json({
                    success: true, 
                    msg: 'You are now logged in! Welcome ' + user.username +'!',
                    token: 'bearer ' + token, 
                    expiresIn: 604800,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            }
        });
    })(req, res, next)
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res, next)=> {
    return {user: req.user};
});

module.exports = router;