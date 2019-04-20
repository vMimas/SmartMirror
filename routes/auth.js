const express = require('express');
const User = require('../models/users');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const mongoose = require('mongoose');

//Setup UsersDB
let UsersDB = require('../models/users');

router.post('/register', (req, res, next)=>{

  if(req.body.password.length < 6){
    console.log("Password must be at least six characters long.");
  } else {

    //check if username is taken in UsersDB
    UsersDB.findOne({username: req.body.username})
      .then(user => {
        if(user){
          console.log("username is taken");
        } else {

          //check if email is taken in UsersDB
          UsersDB.findOne({email: req.body.email})
            .then(user => {
              if(user){
                console.log("Email is taken");
              } else {
                addToDB(req, res);
              }
            });  // End findOne 'email'
        }
      }); // End findOne 'username'

    }
});

async function addToDB(req, res){
    let user = new User({
        email: req.body.email,
        username: req.body.username,
        password: User.hashPassword(req.body.password),
        message: `Hello, ${req.body.username}`
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
                        email: user.email,
                        message: user.message,
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

router.get('/settings', passport.authenticate('jwt', {session: false}), (req, res, next)=> {
    return {user: req.user};
    //res.json({user: req.user});
});

//get all users as json object
router.get('/user', function(req, res, next){
    console.log('Get request for all users');
    UsersDB.find({})
    .exec(function(err, user){
        if(err){
            res.send("Error retrieving users");
        }else{
            res.json(user);
        }
    });
})

//get user by id
router.get('/user/:id', function(req, res) {
      console.log('Get reqest for single user');

      UsersDB.findById(req.params.id)
        .exec(function(err, user){
          if (err){
            console.log("Error retrieving user");
          } else {
            res.json(user);
          }
        })//END '.exec'
    });


//update user
/**router.put('/user/:id', function(req, res){
  console.log('Update a user');
  UsersDB.findByIdAndUpdate(req.params.id,
    {
      $set: {email: req.body.email, username: req.body.username, password: User.hashPassword(req.body.password)}
    },
    {
      new: true
    },
    function(err, updatedUser){
      if(err){
        res.send("Error updating user");
      } else {
        res.json(updatedUser);
      }
    }
  )
});**/

router.put('/user/:id', function(req, res){
  console.log('Update a user');
  //check if username is taken in UsersDB
  UsersDB.findOne({username: req.body.username})
    .then(user => {

        //check if email is taken in UsersDB
        UsersDB.findOne({email: req.body.email})
          .then(user => {
            if(user){
              console.log("Email is taken");
            } else {
              updateDB(req, res);
            }
          });  // End findOne 'email'
    }); // End findOne 'username'
});

async function updateDB(req, res){
  await UsersDB.findByIdAndUpdate(req.params.id,
    {
      $set: {email: req.body.email, username: req.body.username, password: User.hashPassword(req.body.password)}
    },
    {
      new: true
    },
    function(err, updatedUser){
      if(err){
        res.send("Error updating user");
      } else {
        res.json(updatedUser);
      }
    }
  )
}

//delete user
router.delete('/user/:id', function(req, res, next) {
  UsersDB.findByIdAndRemove(req.params.id, req.body, function (err, deletedUser) {
    if (err){
      res.send("Error deleting user")
    } else {
      res.json(deletedUser);
    }
  });
});


module.exports = router;
