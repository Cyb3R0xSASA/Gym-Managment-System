import { Router } from 'express';
import Plans from '../../controllers/v1/plans.controller.js';
import PlansValidation from '../../middlewares/validation/plans.validation.js';
import checkId from '../../middlewares/checkId.js';

const router = Router();

router.get('/', Plans.getPlans);
router.post('/', PlansValidation.planSchema, Plans.addPlan);
router.put('/:id', PlansValidation.planSchema, checkId, Plans.updatePlan);
router.delete('/:id', checkId, Plans.deletePlan);

export default router;