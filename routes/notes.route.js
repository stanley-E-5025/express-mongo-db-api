import expres from "express";
import {
  getAllNotes,
  createNotes,
  getAllNoteById,
  deleteNoteById,
  updateNote,
} from "../controllers/notes.controller.js";
import { routerTokenValidator } from "../middlewares/route-token-validator.js";

const router = expres.Router();

router.get("/", routerTokenValidator, getAllNotes);
router.get("/:id", routerTokenValidator, getAllNoteById);
router.delete("/:id", routerTokenValidator, deleteNoteById);
router.post("/", routerTokenValidator, createNotes);
router.patch("/:id", routerTokenValidator,updateNote);



export default router;
