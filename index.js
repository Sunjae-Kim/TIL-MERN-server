const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('config');

const app = express();

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

app.get('/', (req, res) => {
  res.send('hi');
})

// Request를 google에 toss만 한다.
app.get(
  "/auth/google",
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// req + code => google => Real user data get!
app.get(
  '/auth/google/callback',
  passport.authenticate('google')
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
  console.log(`Listening on port ${PORT}`);
})