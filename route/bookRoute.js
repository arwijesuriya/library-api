const express = require("express");
const router = express.Router();
const Books = require('../models/Books');
const Author = require('../models/Authors');
const Library = require('../models/Library');

// Create a new book
router.post('/', async (req, res) => {
    const { title, author_id, library_ids } = req.body;

    if (!title || !author_id || !library_ids) {
        return res.status(400).json({ 
            message: "Title, Author ID, and Library ID are required" 
        });
    }
    
    if (!Array.isArray(author_id)) {
        return res.status(400).json({ 
            message: 'author_id must be an array' 
        });
    }

    try {
        const authorsExist = await Author.find({ 
            _id: { $in: author_id } 
        }).countDocuments();
        const libraryExists = await Library.findById(library_ids);
    
        if (authorsExist !== author_id.length || !libraryExists) {
            return res.status(400).json({ 
                message: 'Invalid author_id or library_ids' 
            });
        }

        const book = new Books({
            title,
            author_id,
            library_ids
        });

        const newBook = await book.save();
        res.status(201).json(newBook);
    } 
    catch (err) {
        res.status(400).json({ 
            message: err.message 
        });
    }
});

// Read all books
router.get('/', async (req, res) => {
    try {
        const result = await Books.find();
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).send("Book not found");
        }
    }
    catch(error){
        res.status(500).send("Something went wrong");
    }
});

// Read a specific book by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Books.findById(id);
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).send("Book not found");
        }
    }
    catch(error){
        res.status(500).send("Something went wrong");
    }
});

// Update a specific book by ID
router.put('/:id', async (req, res) => {
    try {
        const { title, author_id, library_ids } = req.body;
        
        const authorsExist = await Author.find({ 
            _id: { $in: author_id } 
        }).countDocuments();
        const libraryExists = await Library.findById(library_ids );

        if (authorsExist !== author_id.length || !libraryExists) {
            return res.status(400).json({ 
                message: "Invalid Author ID or Library ID" 
            });
        }

        const book = await Books.findByIdAndUpdate(req.params.id, {
            title,
            author_id,
            library_ids 
        }, 
        { 
            new: true, 
            runValidators: true 
        });

        if (!book) return res.status(404).json({ 
            message: "Book not found" 
        });

        res.json(book);
    } 
    catch (err) {
        res.status(400).json({ 
            message: err.message 
        });
    }
});

// Delete a specific book by ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Books.findById(id).catch((error) => {
            console.error(error)
        });

        if (!book) {
            res.status(404).send("Book not found");
        }
        else {
            try {
                const result = await Books.deleteOne(book)
                res.status(200).json(result)
            }
            catch (error) {
                res.status(500).send(error);
            }
        }
    }
    catch (error) {
        res.status(500).send("Something went wrong");
    }
});

module.exports = router;