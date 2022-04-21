const debug = require('debug')('app:startup');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const home = require('./routes/home');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');

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
app.use('/',home);

// Configuration

console.log("Application Name: " + config.get('name'));
console.log("Mail Server: " + config.get('mail.host'));
console.log("Mail Password: " + config.get('mail.password'));

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug('Morgan Enabled...');
}


app.use(logger);
app.use(auth);


// Get the System's Default port for Listen the server OR set it to 3000
const port = process.env.PORT || 8888;

// Initiate the Server
app.listen(port,()=>console.log(`Listening on port ${port}`));