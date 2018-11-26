const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('config');

passport.use(new GoogleStrategy(
  {
    clientID: config.auth.google.clientID,
    clientSecret: config.auth.google.clientSecret,
    callbackURL: "/auth/google/callback"
  },
  /*
    refreshToken: 언제 expire 시킬지  
  */
  (accessToken, refreshToken, profile, done) => {
    console.log(`accessToken => ${accessToken}`);
    console.log(`refreshToken => ${refreshToken}`);
    console.log(profile);
    console.log(`done => ${done}`);
  }
));