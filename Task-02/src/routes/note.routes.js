const express = require("express");
const router = express.Router();
const { createNote, createBulkNotes, getAllNotes } = require("../controllers/note.controller");

// @route   POST /api/notes/bulk
router.post("/bulk", createBulkNotes);

// @route   POST /api/notes
router.post("/", createNote);

// @route   GET /api/notes
router.get("/", getAllNotes);

module.exports = router;
