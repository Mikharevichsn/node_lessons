import express from 'express';
import rateLimit from 'express-rate-limit';
const router = express.Router();
import UserController from '../../controllers/UserController.js';

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // limit each IP to 100 requests per windowMs
  handler: (req, res) => {
    res.status(403).send({ message: ' Превышен лимит запросов'})
  }
});

router
  .post('/register', limiter, UserController.register)
  .post('/login', UserController.login)
  // .post('/', UserController.add)

export default router;
