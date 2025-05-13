import { Router } from 'express';
import Plans from '../../controllers/v1/plans.controller.js';
import PlansValidation from '../../middlewares/validation/plans.validation.js';
import checkId from '../../middlewares/checkId.js';
import { protect, role } from '../../middlewares/auth.middleware.js';

const router = Router();

router.route('/')
    .get(Plans.getPlans)
    .post(protect, role('sasa'), PlansValidation.planSchema, Plans.addPlan);

router.route('/:id')
    .put(protect, role('sasa'), PlansValidation.planSchema, checkId, Plans.updatePlan)
    .delete(protect, role('sasa'), checkId, Plans.deletePlan);

export default router;