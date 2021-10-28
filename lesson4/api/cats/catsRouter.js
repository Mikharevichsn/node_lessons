import express from 'express';
const router = express.Router();
import CatsController from '../../controllers/CatsController.js';
import { checkAuth } from '../../helpers/checkAuth.js';

router.use(checkAuth);

router
  .get('/', CatsController.getAll)
  .get('/:id', CatsController.getById)
  .get('/:id/vaccinate', CatsController.vaccinateById)
  .get('/get-by-name/:name', CatsController.getByName)
  .put('/', CatsController.updateById)
  .post('/', CatsController.add)
  .delete('/', CatsController.removeById);

export default router;
