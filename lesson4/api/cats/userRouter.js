import express from 'express';
const router = express.Router();
import UserController from '../../controllers/UserController.js';

router
  .post('/register', UserController.register)
  .post('/login', UserController.login)
  // .post('/', UserController.add)

export default router;
