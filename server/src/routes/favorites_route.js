import { Router } from 'express';
import { tryCatch } from '../utils/try_catch.js';
import { deleteUserFavorite, postUserFavorites } from '../controllers/favorites_controller.js';

const router = Router();

router.post("/", tryCatch(postUserFavorites));
router.delete('/', tryCatch(deleteUserFavorite));

export default router;