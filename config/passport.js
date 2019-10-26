const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Load User model
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, (user, password, done) => {
            // Match user
            User.findOne({
                username: user
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'That email is not registered' });
                }

                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    console.log("Bcrypt!")
                    if (err) throw err;
                    if (isMatch) {
                        console.log("is match? yes")
                        return done(null, user);
                    } else {
                        console.log("is match? no")
                        return done(null, false, { message: 'Password incorrect' });
                    }
                });
            });
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user._id);
      });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};