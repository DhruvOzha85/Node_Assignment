const express = require("express");
const {createNote,createNotesBulk,getAllNotes, getNotesById} = require("../controllers/app.controller");

const router = express.Router();

router.post("/", createNote);
router.post("/bulk",createNotesBulk);
router.get("/",getAllNotes);
router.get("/:id",getNotesById);
router.put("/:id",updateNote);
router.patch('/:id', updateNotePartial);
router.delete('/:id', deleteNote);
router.delete('/bulk', deleteNotesBulk);
module.exports = router;