const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    password:{
        type: String,
        required: true,
        minlength: 4,
        maxlength: 1024
    },
    isAdmin : Boolean

});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id,isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
    return token;
}


const User = mongoose.model('User', userSchema);

// Validate the Input (Req.body)
function validateUser(user){
    const schema = Joi.object({
        name : Joi.string().min(4).max(50).required(),
        email: Joi.string().min(4).max(50).required().email({ tlds: { allow: false } }),
        password: Joi.string().min(3).max(1024).required(),
    });
    return schema.validate(user);

}

exports.User = User;
exports.validate = validateUser;