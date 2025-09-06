const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes"); 
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get All Notes (Login required)
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error("🔥 Error in fetchallnotes:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a Note (Login required)
router.post(
  "/addnote",
  [
    body("title", "Enter a valid title (min 3 chars)").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  fetchuser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("❌ Validation failed:", errors.array());
        return res.status(400).json({ errors: errors.array() });
      }

      // Create new note
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error("🔥 Error in addnote:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Update an existing Note (Login required)
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // Create a newNote object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // Find note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Note not found");

    // Check ownership
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.error("🔥 Error in updatenote:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete an existing Note (Login required)
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find note to be deleted
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Note not found");

    // Check ownership
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted", note: note });
  } catch (error) {
    console.error("🔥 Error in deletenote:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
