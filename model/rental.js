const mongoose = require('mongoose');
const Joi = require('joi')



const rentalSchema = new mongoose.Schema({
    customer:{ 
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },

            isGold: {
                type: Boolean,
                default:false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required:true
    },

    movie:{
        type:new mongoose.Schema({
            title: {
                type:String,
                trim:true,
                require:true,
                minlength: 5,
                maxlength: 50
            },

            dailyRentalRate:{
                type:Number,
                require:true,
                min: 5,
                max: 255
            },

        }),
        required:true
    },

    dateOut:{
        type:Date,
        default:Date.now,
        required:true
    },

    dateReturned:{
        type:Date,
    },

    rentalFee:{
        type:Number,
        min:0
    }

});

const Rental = mongoose.model('Rental',rentalSchema);

function validateRental(rental){
    const schema ={
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    };
    return Joi.validate(rental, schema)
}

exports.Rental = Rental,
exports.validate = validateRental