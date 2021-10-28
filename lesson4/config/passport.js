// var JwtStrategy = require('passport-jwt').Strategy,
//     ExtractJwt = require('passport-jwt').ExtractJwt;
// var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//     User.findOne({id: jwt_payload.sub}, function(err, user) {
//         if (err) {
//             return done(err, false);
//         }
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//             // or you could create a new account
//         }
//     });
// }));

import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../database/schemas/userSchema.js';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.SECRET;

const params = {
  secretOrKey: SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
    console.log('🚀 ~ file: passport.js ~ line 38 ~ newStrategy ~ payload', payload)
    try {
      const user = await User.findById(payload.id);
      if (!user) {
        return done(new Error('Пользователь не найден'));
      }
      if (!user.token) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

export default passport;
