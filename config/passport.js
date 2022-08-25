import { Strategy, ExtractJwt } from 'passport-jwt'

import Users from '../models/Users.js'

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET_OR_KEY

const passportConfig = (passport) => {
  passport.use(
    new Strategy(opts, (jwtPayload, done) => {
      Users.findById(jwtPayload.id)
        .then((user) => {
          if (user) {
            return done(null, user)
          }
          return done(null, false)
        })
        .catch((err) => console.log(err))
    })
  )
}

export default passportConfig
