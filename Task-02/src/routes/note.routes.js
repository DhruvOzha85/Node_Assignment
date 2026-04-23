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
} = require("../controllers/note.controller");

// @route   POST /api/notes/bulk
router.post("/bulk", createBulkNotes);

// @route   POST /api/notes
router.post("/", createNote);

// @route   GET /api/notes
router.get("/", getAllNotes);

// @route   DELETE /api/notes/bulk
router.delete("/bulk", deleteBulkNotes);

// @route   GET /api/notes/filter/pinned
router.get("/filter/pinned", getFilteredPinnedNotes);

// @route   GET /api/notes/filter/category
router.get("/filter/category", getFilteredCategoryStats);

// @route   GET /api/notes/filter/date-range
router.get("/filter/date-range", getFilteredNotesByDateRange);

// @route   GET /api/notes/filter
router.get("/filter", filterNotes);

// @route   GET /api/notes/paginate/category/:category
router.get("/paginate/category/:category", paginateNotesByCategory);

// @route   GET /api/notes/paginate
router.get("/paginate", paginateNotes);

// @route   GET /api/notes/sort
router.get("/sort", sortNotes);

// @route   GET /api/notes/category/:category
router.get("/category/:category", getNotesByCategory);

// @route   GET /api/notes/status/:isPinned
router.get("/status/:isPinned", getNotesByStatus);

// @route   GET /api/notes/:id/summary
router.get("/:id/summary", getNoteSummary);

// @route   GET /api/notes/:id
router.get("/:id", getNoteById);

// @route   PUT /api/notes/:id
router.put("/:id", updateNote);

// @route   PATCH /api/notes/:id
router.patch("/:id", patchNote);

// @route   DELETE /api/notes/:id
router.delete("/:id", deleteNote);

module.exports = router;
