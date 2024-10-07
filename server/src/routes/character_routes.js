import { Router } from 'express';
import { tryCatch } from '../utils/try_catch.js';
import { getCharacterByID } from '../controllers/characters_controller.js';

const router = Router();

router.get("/:id", tryCatch(getCharacterByID))

export default router;