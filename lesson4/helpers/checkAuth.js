import passport from 'passport';
import { HttpCodes } from '../constants.js';
import '../config/passport.js';

export const checkAuth = (req, res, next) => {
console.log('🚀 ~ file: checkAuth.js ~ line 7 ~ checkAuth ~ req', req)
  passport.authenticate('jwt', { session: false }, (err, user) => {
    console.log('🚀 ~ file: checkAuth.js ~ line 8 ~ passport.authenticate ~ user', user)
    if (err || !user) {
      return next({
        status: HttpCodes.FORBIDDEN,
        message: 'Forbidden',
      });
    }

    req.user = user;
    // req.locals.user = user;
    // req.app.locals = 'something global';

    return next();
  })(req, res, next)};
