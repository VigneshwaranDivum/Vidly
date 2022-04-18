const mongoose = require('mongoose');
const Joi = require('joi');



const Genre = mongoose.model('Genre',new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:4,
        maxlength:50
    }

}));


// Validate the Input (Req.body)
function validateGenre(genre){
    const schema = Joi.object({
        name : Joi.string().min(3).required(),
    });
    return schema.validate(genre);

}

exports.Genre = Genre;
exports.validate = validateGenre;