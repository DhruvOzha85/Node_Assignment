const Note = require("../models/note.model");

const createNote = async (req, res) => {
    try {
        const { title, content, category, isPinned } = req.body;

   
        if (!title || !content || !category) {
            return res.status(400).json({
                message: "Title, content, and category are required",
            });
        }

        const note = await Note.create({
            title,
            content,
            category,
            isPinned: isPinned ?? false 
        });

        res.status(201).json({
            message: "Note created successfully",
            data: note,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};