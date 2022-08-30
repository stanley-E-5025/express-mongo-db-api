import { Notes } from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const Notelist = await Notes.find({ uid: req.uid });

    return res.json({ Notelist });
  } catch (error) {
    console.log(error);
  }
};

export const getAllNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Notes.findById(id);

    /* if (!note.uid.equals(req.uid)) {
      return res.status(401).json({ error: "not found" });
    }
 */
    return res.json({ note });
  } catch (error) {
    res.json({ error });
  }
};

export const deleteNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Notes.findById(id);

    /* if (!note.uid.equals(req.uid)) {
      return res.status(401).json({ error: "not found" });
    }
 */

    note.remove();

    return res.json({ note });
  } catch (error) {
    res.json({ error: error.message } || { error: error });
  }
};
export const createNotes = async (req, res) => {
  try {
    const { title, body } = req.body;

    const note = new Notes({ title, body, uid: req.uid });

    await note.save();

    res.json({
      status: true,
    });
  } catch (error) {
    console.log(error);
  }
};
