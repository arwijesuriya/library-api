const express = require('express');
const router = express.Router();
const Author = require('../models/Authors');

// Create a new author
router.post("/", async(req,res) => {
    const {name, birth_year} = req.body
    if (!name || !birth_year) {
        res.status(400).send("Please provide name and birth_year");
    }
    else {
        try {
            const result = await Author.create({name, birth_year})
            res.status(201).json(result);       
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
});

// Read all authors
router.get('/', async (req, res) => {
    try {
        const result = await Author.find();
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).send("Author not found");
        }
    } 
    catch (error) {
        res.status(500).send("Something went wrong");
    }
});

// Read a specific author by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Author.findById(id);
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).send("Author not found");
        }
    }
    catch (error) {
        res.status(500).send("Something went wrong");
    }
});

// Update a specific author by ID
router.put("/:id",async(req,res)=>{
    const id = req.params.id;
    try {
        const author = await Author.findById(id).catch((error) => {
            console.error(error)
        });

        if (!author) {
            res.status(404).send("Author not found");
        }
        else {
            const {name,birth_year} = req.body
            if (!name || !birth_year) {
                res.status(400).send("Please enter a name and birth year");
            }
            else {
                try {
                    const result = await author.updateOne({name, birth_year});
                    res.status(201).json(result);       
                }
                catch (error) {
                    res.status(500).send(error);
                }
            }
        }
    }
    catch(error){
        res.status(500).send("Something went wrong");
    }
})

// Delete a specific author by ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const author = await Author.findById(id).catch((error) => {
            console.error(error)
        });
        
        if (!author) {
            res.status(404).send("Author not found");
        }
        else {
            try {
                const result = await Author.deleteOne(author);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).send(error);
            }
        }
    }
    catch (error) {
        res.status(500).send("Something went wrong");
    }
})

module.exports = router;