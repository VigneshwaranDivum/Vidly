const {Genre,validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



// Get all the genres
router.get('/',async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

//Get the particular genre using its ID
router.get('/:id',async(req, res) => {
    const genre = await Genre.findById(req.params.id)
    if(!genre) return res.status(404).send('Not Found');
    res.send(genre);
});


// Create a new genre
router.post('/',async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({
        name : req.body.name
    });
    genre = await genre.save();
    res.send(genre);
});

// Update the particular genre 
router.put('/:id',async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});

    if(!genre) return res.status(404).send('Not Found');

    res.send(genre);
});

// Removing Particular Genre
router.delete('/:id',async (req, res) =>{
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if(!genre) return res.status(404).send('Not Found');


    res.send(genre);
});




module.exports = router;
