const Note = require("../models/noteModel");

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
    });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    if (note.title.length < 3) {
      return res
        .status(400)
        .json({ message: "Title must be at least 3 characters long" });
    }
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getNotes = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const notes = await Note.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalNotes = await Note.countDocuments();

    res.status(200).json({
      notes,
      currentPage: page,
      totalPages: Math.ceil(totalNotes / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createNote, getNotes, updateNote, deleteNote };
