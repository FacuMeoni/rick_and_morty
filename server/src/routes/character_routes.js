import { Router } from 'express';
import { tryCatch } from '../utils/try_catch.js';
import { getAllCharacters, getCharacterByID } from '../controllers/characters_controller.js';

const router = Router();

router.get("/:id", tryCatch(getCharacterByID))
router.get("/", tryCatch(getAllCharacters));

export default router;