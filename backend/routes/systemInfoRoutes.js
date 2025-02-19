// routes/systemInfoRoutes.js
import express from 'express';
import SystemController from '../controllers/systemInfoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Regular HTTP endpoint
router.get('/', SystemController.systemInfo);

// WebSocket route will be handled in app.js
export default router;