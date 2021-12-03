const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes')

//Route 1: get all the notes from user /api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.send(notes);
    }
    catch (error) {
        console.error(error.message);
        req.status(500).json({ error: "Internal server error" });
    }

})

//Route 2: Add a new note using post /api/notes/fetchallnotes
router.post('/addnotes', fetchuser, [body('title', 'Enter a valid title').isLength({ min: 3 }), body('description', 'Discription must be atleast 5 character').isLength({ min: 5 })], async (req, res) => {

    try {
        //destructuring
        const { title, description, tag } = req.body;
        // If there are errors done by use in making notes
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // If there is not any error
        const note = new Notes({
            title, description, tag, user: req.user.id
        });
        //saving notes 
        const savedNote = await note.save();
        res.send(savedNote);
    }
    catch (error) {
        console.error(error.message);
        req.status(500).json({ error: "Internal server error" });
    }
})


// Route 3: update an existing node using put /api/notes/updatenotes 
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    //destructuring
    const { title, description, tag } = req.body;
    try {
        //create a new Note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // params id is the id given in the link upper /updatenotes/:id  <- params.id(/:id)
        let note = await Notes.findById(req.params.id);
        // if this note dosent exists
        if (!note) { return res.status(404).send("Not found") }

        //cheking user 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ permission: "not Allowed" });
        }

        //everything is fine
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note })
    }
    catch (error) {
        console.error(error.message);
        req.status(500).json({ error: "Internal server error" });
    }
})
// Route 4: deleting an existing node using put /api/notes/deletenodes 
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    try {
        // params id is the id given in the link upper /updatenotes/:id  <- params.id(/:id)
        let note = await Notes.findById(req.params.id);
        // if this note dosent exists
        if (!note) { return res.status(404).send("Not found") }

        //cheking user 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ permission: "not Allowed" });
        }

        //everything is fine
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ success: "Note has been deleted" })
    }
    catch (error) {
        console.error(error.message);
        req.status(500).json({ error: "Internal server error" });
    }
})
module.exports = router;