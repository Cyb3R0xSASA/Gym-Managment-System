import { Router } from 'express';
import Gyms from '../../controllers/v1/gym.controller.js';
import { protect, role } from '../../middlewares/auth.middleware.js';
import checkId from '../../middlewares/checkId.js';

const router = Router();

router.route('/')
    .get(Gyms.getGyms)
    .post(protect, role('admin'), Gyms.addGym);

router.route('/:id')
    .get(Gyms.getGym)
    .put(protect, role('admin'), Gyms.updateGym)
    .delete(protect, role('admin'), Gyms.deleteGym);

export default router;