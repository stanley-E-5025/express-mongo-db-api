import expres from "express";
import {
  getAllNotes,
  createNotes,
  getAllNoteById,
  deleteNoteById,
} from "../controllers/notes.controller.js";
import { routerTokenValidator } from "../middlewares/route-token-validator.js";

const router = expres.Router();

router.get("/", routerTokenValidator, getAllNotes);
router.get("/:id", routerTokenValidator, getAllNoteById);
router.delete("/:id", routerTokenValidator, deleteNoteById);

router.post("/", routerTokenValidator, createNotes);

export default router;
