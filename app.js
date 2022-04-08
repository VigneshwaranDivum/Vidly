const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres =[
    {id: 1, name: 'Thriller'},
    {id: 2, name: 'Horror'},
    {id: 3, name: 'Mystery'}
];

// Simple Saying "Hello World" for home page
app.get('/',(req, res) => {
    res.send('Hello World')
});

// Get all the genres
app.get('/api/genres',(req, res) => {
    res.send(genres);
});

//Get the particular genre using its ID
app.get('/api/genres/:id',(req, res) => {
    const genre = genres.find(gen => gen.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send('Not Found');
    res.send(genre);
});


// Create a new genre
app.post('/api/genres',(req, res) => {
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre ={
        id : genres.length+1,
        name : req.body.name
    }
    genres.push(genre);
    res.send(genre);
});

// Update the particular genre 
app.put('/api/genres/:id',(req, res) => {
    const genre = genres.find(gen => gen.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send('Not Found');

    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/api/genres/:id',(req, res) =>{
    const genre = genres.find(gen => gen.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send('Not Found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});


// Validate the Input (Req.body)
function validateGenre(genre){
    const schema = Joi.object({
        name : Joi.string().min(3).required(),
    });
    return schema.validate(genre);

}


// Get the System's Default port for Listen the server OR set it to 3000
const port = process.env.PORT || 3000;

// Initiate the Server
app.listen(port,()=>console.log(`Listening on port ${port}`));