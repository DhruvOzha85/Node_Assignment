const express = require("express");
const router = express.Router();
const { createNote, createBulkNotes, getAllNotes, getNoteById } = require("../controllers/note.controller");

// @route   POST /api/notes/bulk
router.post("/bulk", createBulkNotes);

// @route   POST /api/notes
router.post("/", createNote);

// @route   GET /api/notes
router.get("/", getAllNotes);

// @route   GET /api/notes/:id
router.get("/:id", getNoteById);

module.exports = router;
