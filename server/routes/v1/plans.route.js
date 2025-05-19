import { Router } from 'express';
import Plans from '../../controllers/v1/plans.controller.js';
import PlansValidation from '../../middlewares/validation/plans.validation.js';
import { checkId } from '../../middlewares/checkId.js';
import { protect, role } from '../../middlewares/auth.middleware.js';

const router = Router();

/**
 * @openapi
 * /api/v1/plans:
 *   get:
 *     summary: Retrieve all subscription plans
 *     tags:
 *       - Plans
 *     responses:
 *       200:
 *         description: Plans fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Plans fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 68271c8bedc2ce0e37773e8c
 *                       name:
 *                         type: object
 *                         properties:
 *                           ar:
 *                             type: string
 *                             example: مجانية
 *                           en:
 *                             type: string
 *                             example: Free
 *                       description:
 *                         type: object
 *                         properties:
 *                           ar:
 *                             type: string
 *                             example: خطة تجريبية لمدة 7 أيام...
 *                           en:
 *                             type: string
 *                             example: A 7-day trial plan...
 *                       features:
 *                         type: object
 *                         properties:
 *                           branches:
 *                             type: number
 *                             example: 1
 *                           employeesPerBranch:
 *                             type: number
 *                             example: 1
 *                           trainersPerBranch:
 *                             type: number
 *                             example: 1
 *                           clientsPerBranch:
 *                             type: number
 *                             example: 15
 *                       monthlyPrice:
 *                         type: number
 *                         example: 0
 *                       semiAnnualPrice:
 *                         type: number
 *                         example: 0
 *                       annualPrice:
 *                         type: number
 *                         example: 0
 *                       semiAnnualDiscount:
 *                         type: number
 *                         example: 0
 *                       annualDiscount:
 *                         type: number
 *                         example: 0
 *       404:
 *         description: No plans found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *                  
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
 *             $ref: '#/components/schemas/ErrorResponse'
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