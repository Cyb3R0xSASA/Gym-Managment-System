import { Router } from 'express';
import Plans from '../../controllers/v1/plans.controller.js';
import validatePlan from '../../middlewares/validation/plans.validation.js';
import checkId from '../../utils/checkId.js';

const router = Router();

router.get('/', Plans.getPlans);
router.post('/', validatePlan, Plans.addPlan);
router.put('/:id', validatePlan, checkId, Plans.updatePlan);
router.delete('/:id', checkId, Plans.deletePlan);

export default router;