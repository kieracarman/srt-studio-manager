const JwtStrategy = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
require('dotenv').config();

const Users = mongoose.model('users');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_OR_KEY;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      Users.findById(jwtPayload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    }),
  );
};
