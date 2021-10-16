import express from 'express';
const router = express.Router();
import CatsController from '../../controllers/CatsController.js';

router
  .get('/', CatsController.getAll)
  .get('/:id', CatsController.getById)
  .post('/', CatsController.add)
  .delete('/', CatsController.removeById);

export default router;
