const express = require("express");
const router = express.Router();
const { createNote } = require("../controllers/note.controller");

// @route   POST /api/notes
router.post("/", createNote);

module.exports = router;
