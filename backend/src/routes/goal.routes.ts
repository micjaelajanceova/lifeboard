import { Router } from 'express'
import { getGoals, getPublicGoals, getGoalById, createGoal, updateGoal, deleteGoal } from '../controllers/goal.controller'
import { protect } from '../middleware/auth.middleware'

const router = Router()

/**
 * @swagger
 * /api/goals:
 *   get:
 *     summary: Get all goals for logged in user
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of goals }
 *   post:
 *     summary: Create a new goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201: { description: Goal created }
 */
router.get('/public', getPublicGoals)
router.use(protect)
router.get('/', getGoals)
router.post('/', createGoal)

/**
 * @swagger
 * /api/goals/{id}:
 *   get:
 *     summary: Get goal by ID
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Goal data }
 *       404: { description: Goal not found }
 *   put:
 *     summary: Update goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Updated goal }
 *   delete:
 *     summary: Delete goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Goal deleted }
 */
router.get('/:id', getGoalById)
router.put('/:id', updateGoal)
router.delete('/:id', deleteGoal)

export default router