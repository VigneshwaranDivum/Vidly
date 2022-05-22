const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const debug = require('debug')('app:startup');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
// const auth = require('./middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const home = require('./routes/home');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

app.set('view engine', 'pug');
app.set('views','./views');


mongoose.connect('mongodb://localhost/vidly')
    .then(()=> console.log('Connected to MongoDB'))
    .catch(err => console.error('Couldn\'t connect to MongoDB'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users);
app.use('/api/auth', auth);
app.use('/',home);

// Configuration

if(!config.get('jwtPrivateKey')){
    console.error('FATEL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}



app.use(logger);
// app.use(auth);


const port = process.env.PORT || 8888;

// Initiate the Server
app.listen(port,()=>console.log(`Listening on port ${port}`));