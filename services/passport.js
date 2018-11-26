const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('config');
const mongoose = require('mongoose');
const { User } = require('../models/User');

// Serialize해서 사용자 cookie에 저장
// user의 google id가 아니라 노출되도 상관없는 db 내부의 ObjectID를
// Serialize하자.
passport.serializeUser((user, done) => {
  done(null, user.id); // set-cookie(serialized(user.id)) 와 같은 느낌
});

// setting되어있는 cookie를 분석하여 사용자가 누구인지 확인하는 과정
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(error => {
      console.error(error);
    })
});

passport.use(new GoogleStrategy(
  {
    clientID: config.auth.google.clientID,
    clientSecret: config.auth.google.clientSecret,
    callbackURL: "/auth/google/callback",
    proxy: true
  },
  /*
    refreshToken: 언제 expire 시킬지  
  */
  (accessToken, refreshToken, profile, done) => {
    let user = User.findOne({ googleID: profile.id})
      .then(existingUser => {
        if(existingUser) { 
          done(null, existingUser);
        } else { // New User
          user = new User({ googleID: profile.id});
          user.save()
            .then(newUser => done(null, newUser))
            .catch(error => console.error(error.message));
        }
      })
      .catch(error => console.error(error.message));
  }
));