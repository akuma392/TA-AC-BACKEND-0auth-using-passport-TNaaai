var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var User = require('../models/user');
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      var newUser = {
        name: profile.displayName,
        username: profile.username,
        email: profile._json.email,
        photo: profile._json.avatar_url,
      };

      console.log(newUser);
      User.findOne({ email: profile._json.email }, (err, user) => {
        if (err) return done(err);
        console.log(user, 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
        if (!user) {
          User.create(newUser, (err, addedUser) => {
            console.log(err, addedUser, 'qqqqqqqqqqqq');
            if (err) return done(err);
            return done(null, addedUser);
          });
        } else {
          console.log('helllllllllllllllllloo');
          return done(null, user);
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
