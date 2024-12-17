import express from 'express';
const router = express.Router();
import * as duenoController from '../controllers/duenoController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

/**
 * @swagger
 * tags:
 *   name: Dueños
 *   description: Operaciones CRUD para Dueños de Mascota
 */

router.get('/', authMiddleware, duenoController.getAllDuenos);
router.get('/:id', authMiddleware, duenoController.getDuenoById);
router.post('/', authMiddleware, duenoController.createDueno);
router.put('/:id', authMiddleware, duenoController.updateDueno);
router.delete('/:id', authMiddleware, duenoController.deleteDueno);

export default router;
