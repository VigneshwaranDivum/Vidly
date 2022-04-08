const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

// List of Genres
const genres =[
    {id: 1, name: 'Thriller'},
    {id: 2, name: 'Horror'},
    {id: 3, name: 'Romance'},
    {id: 4, name: 'Mystery'},
    {id: 5, name: 'Comedy'}
];

// Home Page
app.get('/',(req,res) => {
    res.send("Hello All...This is Vidly a movie genre site.");
});

// To get all genres
app.get('/api/genres',(req,res) => {
    res.send(genres);
});

// To get Specific Genres
app.get('/api/genres/:id',(req,res) => {
    var genre = genres.find(g=>g.id === parseInt(req.params.id));
    if(!genre){
        return res.status(404).send('The genre with given id is not found');
    }
    res.send(genre);
});

// Posting Genres
app.post('/api/genres',(req,res)=>{
    const {error} = validateGenre(req.body);
 if(error){
     res.status(400).send(error.details[0].message);
     return;
 }

    const genre = {
        id : genres.length + 1,
        name : req.body.name
    }
    genres.push(genre);
    res.send(genre);
});

// Changing genre name with new name
app.put('/api/genres/:id',(req,res) => {
    var genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre){
     return res.status(404).send('The genre with given id is not found');
    }
    const {error} = validateGenre(req.body);
 if(error){
     res.status(400).send(error.details[0].message);
     return;
 }

 genre.name = req.body.name;
 res.send(genre);
});

// Deleting
app.delete('/api/genres/:id',(req,res)=>{
    var genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre){
    return res.status(404).send('The genre with given id is not found');
    }
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});


// Validating Genre function
function validateGenre(genre){
    const schema =Joi.object({
        name: Joi.string().min(3).required(),
     });
     return schema.validate(genre);
}


const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`Listening on port ${port}...`));
