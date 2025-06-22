const Note = require('../models/note');

// Create Note
exports.createNote = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: "Note text cannot be empty." });
        }
        const note = new Note({ text, user: req.user.userId });
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating note", error: error.message });
    }
};

// Get Notes
exports.getNote = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.userId }).sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching notes", error: error.message });
    }
};

// Update Note
exports.updateNote = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: "Updated note text cannot be empty." });
        }

        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId },
            { text },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: "Note not found or not authorized to edit." });
        }

        res.json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating note", error: error.message });
    }
};

// Delete Note
exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.userId });

        if (!note) {
            return res.status(404).json({ message: "Note not found or not authorized to delete." });
        }

        res.json({ message: "Note deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting note", error: error.message });
    }
};
