import express from 'express';
import { checkABC, getHoidanit, getHomepage } from '../controllers/homeController.js';
const router = express.Router();
router.get('/',getHomepage)
router.get('/abc',checkABC)
router.get('/hoidanit', getHoidanit)

export default router;