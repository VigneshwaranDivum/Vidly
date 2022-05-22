const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash')
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();


router.post('/',async(req,res) => {

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Invalid Email or Password');

    const vaildPassword = await bcrypt.compare(req.body.password, user.password);
    if(!vaildPassword) return res.status(400).send('Invalid Password');

    const token = user.generateAuthToken();
    res.send(token);
})

function validate(req){
    const schema = Joi.object({
        email: Joi.string().min(4).max(50).required().email({ tlds: { allow: false } }),
        password: Joi.string().min(3).max(1024).required(),
    });
    return schema.validate(req);

}


module.exports = router;