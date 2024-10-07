import { Router } from 'express';
import { getUserFavorites, loginUser, registerUser } from '../controllers/user_controller.js';
import { tryCatch } from '../utils/try_catch.js';

const router = Router();

router.get("/favorites/:id", tryCatch(getUserFavorites));
router.post('/register', tryCatch(registerUser));
router.post('/login', tryCatch(loginUser));

export default router;