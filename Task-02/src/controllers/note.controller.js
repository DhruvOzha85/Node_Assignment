const Note = require("../models/note.model");

// @desc    Create a new note
// @route   POST /api/notes
// @access  Public
const createNote = async (req, res) => {
  try {
    const { title, content, category, isPinned } = req.body;

    // Basic validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
        data: null,
      });
    }

    const note = await Note.create({
      title,
      content,
      category,
      isPinned,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Create multiple notes at once
// @route   POST /api/notes/bulk
// @access  Public
const createBulkNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    // Validate that notes is a non-empty array
    if (!Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body must contain a non-empty 'notes' array",
        data: null,
      });
    }

    // Validate each note has required fields
    for (let i = 0; i < notes.length; i++) {
      if (!notes[i].title || !notes[i].content) {
        return res.status(400).json({
          success: false,
          message: `Note at index ${i} is missing title or content`,
          data: null,
        });
      }
    }

    const createdNotes = await Note.insertMany(notes);

    res.status(201).json({
      success: true,
      message: `${createdNotes.length} notes created successfully`,
      data: createdNotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  createNote,
  createBulkNotes,
};
