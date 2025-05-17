import { Router } from 'express';
import Plans from '../../controllers/v1/plans.controller.js';
import PlansValidation from '../../middlewares/validation/plans.validation.js';
import checkId from '../../middlewares/checkId.js';
import { protect, role } from '../../middlewares/auth.middleware.js';

const router = Router();

/**
 * @openapi
 * /plans:
 *   get:
 *     summary: Retrieve all subscription plans
 *     tags:
 *       - Plans
 *     responses:
 *       '200':
 *         description: A list of plans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plan'
 *   post:
 *     summary: Create a new subscription plan
 *     tags:
 *       - Plans
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlanInput'
 *     responses:
 *       '201':
 *         description: Plan created
 *       '400':
 *         description: Validation error
 *       '403':
 *         description: Forbidden (wrong role)
 */

router.route('/')
    .get(Plans.getPlans)
    .post(protect, role('sasa'), PlansValidation.planSchema, Plans.addPlan);

/**
 * @openapi
 * /plans/{id}:
 *   put:
 *     summary: Update an existing plan
 *     tags:
 *       - Plans
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/planId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlanInput'
 *     responses:
 *       '200':
 *         description: Plan updated
 *       '404':
 *         description: Plan not found
 *   delete:
 *     summary: Delete a plan
 *     tags:
 *       - Plans
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/planId'
 *     responses:
 *       '204':
 *         description: Deleted successfully
 *       '404':
 *         description: Plan not found
 */

router.route('/:id')
    .put(protect, role('sasa'), PlansValidation.planSchema, checkId, Plans.updatePlan)
    .delete(protect, role('sasa'), checkId, Plans.deletePlan);

export default router;