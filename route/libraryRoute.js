const express = require('express');
const router = express.Router();
const Library = require('../models/Library');

// Create a new library
router.post('/', async (req, res) => {
    const {name,location}=req.body
    if (!name || !location) {
        res.status(400).send("Please provide a name and location");
    }
    else {
        try {
            const result = await Library.create({ name, location })
            res.status(201).json(result);       
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
});

// Read all libraries
router.get('/', async (req, res) => {
    try {
        const result = await Library.find();
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).send("Library not found");
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});

// Read a specific library by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Library.findById(id);
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).send("Library not found");
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});

// Update a specific library by ID
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const library = await Library.findById(id).catch((error) => {
        console.error(error)
    });

    if (!library) {
        res.status(404).send("Library not found");
    }
    else {
        const { name, location } = req.body;
        if (!name || !location) {
            res.status(400).send("Please provide name and location");
        }
        else {
            try {
                const result = await library.updateOne({ name, location });
                res.status(201).json(result);       
            }
            catch (error) {
                res.status(500).send(error);
            }
        }
    }
});

// Delete a specific library by ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const library = await Library.findById(id).catch((error) => {
        console.error(error)
    });

    if (!library) {
        res.status(404).send("Library not found");
    }
    else {
        try {
            const result = await Library.deleteOne(library);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
});

module.exports = router;