const {Movie , validate} = require('../model/movie');
const {Genre} = require('../model/genre');
const express = require('express');
const router = express.Router()



router.get('/', async(req,res)=> {
    const movie = await Movie.find().sort('name')
    res.send (movie)
})


router.get('/:id', async (req, res) => {

    let movie = await Movie.findById(req.params.id);

    if (!movie) return res.status(400).send('genre with the ID not found') 

    res.send(movie);
});



router.post('/', async (req,res) => {

    const {error} = validate(req.body) 

    if(error) return res.status(400).send(error.details[0].message);

     const genre = await Genre.findById(req.body.genreId);

     if(!genre)return res.status(400).send('invalid Genre');



    let movie = new Movie({
        title: req.body.title,
       genre: {
            _id: genre._id,
            name: genre.name
            },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    
    movie = await movie.save()
    res.send(movie)


});

router.put('/:id', async(req,res)=>{

    const {error} = validate(req.body)

    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);

     if(!genre)return res.status(400).send('invalid Genre');
    
    let movie = await Movie.findByIdAndUpdate( 
        req.params.id,
        {
            title:req.body.title,
            genre:{
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        },
        {new:true}

        );
        

    if (!movie) return res.status(400).send('genre with the ID not found')

    
     res.send(movie)
});


router.delete('/:id',async(req,res)=>{

    // const {error} = validate(req.body)
    // if(error) return res.status(400).send(error.details[0].message);

    let movie = await Movie.findByIdAndDelete(req.params.id,);
    
    if (!movie) return res.status(400).send('genre with the ID not found')

    res.send(movie)

});


module.exports = router;