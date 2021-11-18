import passport from 'passport';
import { HttpCodes } from '../constants.js';
import '../config/passport.js';

export const checkAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
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
  })(req, res, next);
};

export default checkAuth;
