const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const {genreSchema} = require('./genre');



const Movie = mongoose.model('Movies',new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim:true, 
        minlength:4,
        maxlength:50
    },
    genre:{
        type:genreSchema,
        required: true
    },
    numberInStock:{
        type: Number,
        required: true,
        min:0,
        max:500
    },
    dailyRentalRate:{
        type: Number,
        required: true,
        min:0,
        max:500
    }

}));


// Validate the Input (Req.body)
function validateMovie(movie){
    const schema = Joi.object({
        title : Joi.string().min(0).max(50).required(),
        genreId : Joi.objectId().required(),
        numberInStock : Joi.number().min(0).required(),
        dailyRentalRate : Joi.number().min(0).required()
    });
    return schema.validate(movie);

}

exports.Movie = Movie;
exports.validate = validateMovie;