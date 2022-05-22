const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const rentalSchema = new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            name:{
                type: String,
                required: true,
                minlength:4,
                maxlength:50
            },
            isGold:{
                type: Boolean,
                default: false,
            },
            phone:{
                type: Number,
                required: true,
                minLength:4,
                maxlength:10
            }
        
        }),
        required: true
    },
    movie:{
        type: new mongoose.Schema({
            title:{
            type:String,
            required: true,
            trim:true,
            minlength:5,
            maxlength:50
        },
        dailyRentalRate:{
            type: Number,
            required: true,
            min:0,
        }
        }),
        required: true,
    },
    dateOut:{
        type:Date,
        required: true,
        default: Date.now()
    },
    dateReturned:{
        type: Date,
    },
    // rentalFee:{
    //     type: Number,
    //     required: true,
    //     min:0
    // }
    
});

const Rental = mongoose.model('Rental',rentalSchema);

function validateRental(rental){
    const schema = Joi.object({
        customerId : Joi.objectId().required(),
        movieId: Joi.objectId().required(),
        // rentalFee:Joi.number().required()
    });
    return schema.validate(rental);

}

exports.Rental = Rental;
exports.validate = validateRental;