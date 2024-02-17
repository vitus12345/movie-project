const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');



mongoose.connect('mongodb://localhost/movierent')
.then(() => console.log('Connected to MongoDB......'))
.catch(err => console.log('Could not connect to MongoDB.....', err))

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
    }
    

const genresRouter = require('./router/genres');
const customersRouter = require('./router/customers');
const moviesRouter = require('./router/movies');
const rentalRouter = require('./router/rentals');
const userRouter = require('./router/users');
const auth = require('./router/auth');






app.use(express.json());

app.use('https://267d-102-88-33-239.ngrok-free.app/api/genres', genresRouter);
app.use('https://267d-102-88-33-239.ngrok-free.app/api/customers', customersRouter);
app.use('https://267d-102-88-33-239.ngrok-free.app/api/movies', moviesRouter);
app.use('https://267d-102-88-33-239.ngrok-free.app/api/rentals', rentalRouter);
app.use('https://267d-102-88-33-239.ngrok-free.app/api/users', userRouter);
app.use('https://267d-102-88-33-239.ngrok-free.app/api/auths', auth);





const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`listening on port ${port}...`)});