const express = require("express");
const router = express.Router();
const { createNote, createBulkNotes } = require("../controllers/note.controller");

// @route   POST /api/notes/bulk
router.post("/bulk", createBulkNotes);

// @route   POST /api/notes
router.post("/", createNote);

module.exports = router;
