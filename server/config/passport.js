const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const models = require('../models/a11yTreeModels');
require('dotenv').config();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        console.log('looking for user');
        let user = await models.User.findOne({ githubId: profile.id });
        console.log(user);
        if (!user) {
          // If user doesn't exist, create a new user
          console.log('create user');
          user = await models.User.create({
            githubId: profile.id,
            username: profile.username,
            profileUrl: profile.profileUrl,
            avatarUrl: profile._json.avatar_url,
          });
        }

        return done(null, user);
      } catch (err) {
        console.log('passport lookup error');
        return done(err, null);
      }
    }
  )
);

// Serialize user to the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await models.User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
