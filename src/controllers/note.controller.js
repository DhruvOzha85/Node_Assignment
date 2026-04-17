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
const createNotesBulk = async (req,res) => {
    try{
        const notes = req.body.notes;
        const result = await Note.insertMany(notes);
        res.status(201).json(result);

    }
    catch(err) {
        res.status(500).json({error : err.message});
    }
};
const getAllNotes = async(req,res) => {
    try{
       const notes =  await Note.find();
       return res.status(200).json(notes);
    }
    catch(error){
        return res.status(404).json({
            error: error.message
        })
    }
};
const getNotesById = async(req,res) => {
    try{
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message : "Note not found"});
        }
        res.json(note);
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
};
const updateNote = async (req,res) => {
    try{
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new :true,overwrite : true}
        );
        if(!updatedNote){
            return res.status(400).json({message : "Not found"});
        }
        res.json(updatedNote);
    }
    catch(err){
        return res.status(500).json({err : err.message});
    }
};
module.exports = {createNote,createNotesBulk,getAllNotes,getNotesById,updateNote};