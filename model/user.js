const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },

    email:{
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 225
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1025
    },
    isAdmin:Boolean
})

    userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id , name: this.name}, config.get('jwtPrivateKey'));
    return token;
    }
    

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema ={
       name: Joi.string().min(5).max(50).required(),
       email: Joi.string().min(5).max(225).required().email(),
       password: Joi.string().min(5).max(1025).required()
    };
    return Joi.validate(user, schema)
};


exports.User= User
exports.validate = validateUser