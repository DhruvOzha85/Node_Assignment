const Note = require("../models/note.model");
const mongoose = require("mongoose");

// Helper: Validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

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

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: `${notes.length} notes retrieved successfully`,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Get a single note by ID
// @route   GET /api/notes/:id
// @access  Public
const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
        data: null,
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Note retrieved successfully",
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

// @desc    Update a note (full replacement)
// @route   PUT /api/notes/:id
// @access  Public
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
        data: null,
      });
    }

    const { title, content, category, isPinned } = req.body;

    // PUT requires all fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required for full update",
        data: null,
      });
    }

    const note = await Note.findByIdAndUpdate(
      id,
      { title, content, category, isPinned },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
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

// @desc    Update a note partially
// @route   PATCH /api/notes/:id
// @access  Public
const patchNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
        data: null,
      });
    }

    // Handle empty request body
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body cannot be empty for PATCH update",
        data: null,
      });
    }

    const note = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Note partially updated successfully",
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

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Public
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
        data: null,
      });
    }

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
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

// @desc    Delete multiple notes
// @route   DELETE /api/notes/bulk
// @access  Public
const deleteBulkNotes = async (req, res) => {
  try {
    const { ids } = req.body;

    // Validate that ids is a non-empty array
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body must contain a non-empty 'ids' array",
        data: null,
      });
    }

    // Validate each ID
    for (let i = 0; i < ids.length; i++) {
      if (!isValidObjectId(ids[i])) {
        return res.status(400).json({
          success: false,
          message: `ID at index ${i} is invalid`,
          data: null,
        });
      }
    }

    const result = await Note.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} notes deleted successfully`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Get notes by category
// @route   GET /api/notes/category/:category
// @access  Public
const getNotesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    // Validate category enum
    const validCategories = ["work", "personal", "study"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Invalid category. Must be one of: ${validCategories.join(
          ", "
        )}`,
        data: null,
      });
    }

    const notes = await Note.find({ category }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: `Notes for category '${category}' retrieved successfully`,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Get notes by pinned status
// @route   GET /api/notes/status/:isPinned
// @access  Public
const getNotesByStatus = async (req, res) => {
  try {
    let { isPinned } = req.params;

    // Convert string to boolean
    if (isPinned === "true") isPinned = true;
    else if (isPinned === "false") isPinned = false;
    else {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Use 'true' or 'false'",
        data: null,
      });
    }

    const notes = await Note.find({ isPinned }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: `Notes with isPinned=${isPinned} retrieved successfully`,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Get summary of a note
// @route   GET /api/notes/:id/summary
// @access  Public
const getNoteSummary = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
        data: null,
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    // Create summary (e.g., first 50 characters of content)
    const summary =
      note.content.length > 50
        ? note.content.substring(0, 50) + "..."
        : note.content;

    res.status(200).json({
      success: true,
      message: "Note summary generated successfully",
      data: {
        id: note._id,
        title: note.title,
        summary: summary,
        category: note.category,
        isPinned: note.isPinned,
        createdAt: note.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Filter notes by multiple criteria
// @route   GET /api/notes/filter
// @access  Public
const filterNotes = async (req, res) => {
  try {
    const { category, isPinned, title } = req.query;
    const filter = {};

    if (category) {
      const validCategories = ["work", "personal", "study"];
      if (validCategories.includes(category)) {
        filter.category = category;
      }
    }

    if (isPinned !== undefined) {
      if (isPinned === "true") filter.isPinned = true;
      else if (isPinned === "false") filter.isPinned = false;
    }

    if (title) {
      filter.title = { $regex: title, $options: "i" }; // Case-insensitive search
    }

    const notes = await Note.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: `${notes.length} notes found matching criteria`,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Get filtered pinned notes
// @route   GET /api/notes/filter/pinned
// @access  Public
const getFilteredPinnedNotes = async (req, res) => {
  try {
    const notes = await Note.find({ isPinned: true }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: `${notes.length} pinned notes found`,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Get counts of notes by category
// @route   GET /api/notes/filter/category
// @access  Public
const getFilteredCategoryStats = async (req, res) => {
  try {
    const stats = await Note.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Category statistics retrieved successfully",
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Get notes within a date range
// @route   GET /api/notes/filter/date-range
// @access  Public
const getFilteredNotesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide both startDate and endDate query parameters",
        data: null,
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validate dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use YYYY-MM-DD",
        data: null,
      });
    }

    const notes = await Note.find({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: `${notes.length} notes found in date range`,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Get paginated notes
// @route   GET /api/notes/paginate
// @access  Public
const paginateNotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const notes = await Note.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Note.countDocuments();

    res.status(200).json({
      success: true,
      message: `Page ${page} of notes retrieved`,
      data: {
        notes,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Get paginated notes by category
// @route   GET /api/notes/paginate/category/:category
// @access  Public
const paginateNotesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Validate category enum
    const validCategories = ["work", "personal", "study"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Invalid category. Must be one of: ${validCategories.join(
          ", "
        )}`,
        data: null,
      });
    }

    const notes = await Note.find({ category })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Note.countDocuments({ category });

    res.status(200).json({
      success: true,
      message: `Page ${page} of notes for category '${category}' retrieved`,
      data: {
        notes,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Get sorted notes
// @route   GET /api/notes/sort
// @access  Public
const sortNotes = async (req, res) => {
  try {
    const { sortBy = "createdAt", order = "desc" } = req.query;

    // Validate sort fields
    const validFields = ["title", "category", "createdAt", "isPinned"];
    if (!validFields.includes(sortBy)) {
      return res.status(400).json({
        success: false,
        message: `Invalid sort field. Use one of: ${validFields.join(", ")}`,
        data: null,
      });
    }

    // Validate order
    const sortOrder = order === "asc" ? 1 : -1;

    const notes = await Note.find().sort({ [sortBy]: sortOrder });

    res.status(200).json({
      success: true,
      message: `Notes sorted by ${sortBy} in ${
        order === "asc" ? "ascending" : "descending"
      } order`,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Get sorted pinned notes
// @route   GET /api/notes/sort/pinned
// @access  Public
const sortPinnedNotes = async (req, res) => {
  try {
    const { order = "desc" } = req.query;
    const sortOrder = order === "asc" ? 1 : -1;

    const notes = await Note.find({ isPinned: true }).sort({
      createdAt: sortOrder,
    });

    res.status(200).json({
      success: true,
      message: `Pinned notes sorted by createdAt in ${
        order === "asc" ? "ascending" : "descending"
      } order`,
      data: notes,
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
  getAllNotes,
  getNoteById,
  updateNote,
  patchNote,
  deleteNote,
  deleteBulkNotes,
  getNotesByCategory,
  getNotesByStatus,
  getNoteSummary,
  filterNotes,
  getFilteredPinnedNotes,
  getFilteredCategoryStats,
  getFilteredNotesByDateRange,
  paginateNotes,
  paginateNotesByCategory,
  sortNotes,
  sortPinnedNotes,
};
