const express = require("express");
const router = express.Router();
const {
  createNote,
  createBulkNotes,
  getAllNotes,
  getNoteById,
  updateNote,
  patchNote,
  deleteNote,
} = require("../controllers/note.controller");

// @route   POST /api/notes/bulk
router.post("/bulk", createBulkNotes);

// @route   POST /api/notes
router.post("/", createNote);

// @route   GET /api/notes
router.get("/", getAllNotes);

// @route   GET /api/notes/:id
router.get("/:id", getNoteById);

// @route   PUT /api/notes/:id
router.put("/:id", updateNote);

// @route   PATCH /api/notes/:id
router.patch("/:id", patchNote);

// @route   DELETE /api/notes/:id
router.delete("/:id", deleteNote);

module.exports = router;
