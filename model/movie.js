const {genreSchema} = require('./genre')
const mongoose = require('mongoose');
const Joi = require('joi')


const movieSchema = new mongoose.Schema({
    title: {
        type:String,
        trim:true,
        require:true,
        minlength: 5,
        maxlength: 50
    },

    gener:{
        type:genreSchema,
        require:true
    },

    numberInStock:{
        type:Number,
        require:true,
        min: 5,
        max: 255
    },

    dailyRentalRate:{
        type:Number,
        require:true,
        min: 5,
        max: 255
    }
})

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie){
    const schema ={
        title: Joi.string().min(5).max(255).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(5).max(255).required(),
        dailyRentalRate: Joi.number().min(5).max(255).required(),

    };
    return Joi.validate(movie, schema)
}


exports.Movie= Movie,
exports.validate = validateMovie