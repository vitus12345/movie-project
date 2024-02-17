const {Genre , validate} = require('../model/genre');
const Joi = require('joi');
const express = require('express');
const router = express.Router()

const auth = require('../middleware/auth');






router.get('/', async(req,res)=> {
    const genres = await Genre.find().sort('name')
    res.send (genres)
})

router.get('/:id', async (req, res) => {

    let genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(400).send('genre with the ID not found') 

    res.send(genre);
});

router.post('/', auth, async (req,res) => {

    const {error} = validate(req.body) 

    if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({
        name: req.body.name
    })
    
    await genre.save()
    res.send(genre)


})

router.put('/:id', async(req,res)=>{

    const {error} = validate(req.body)

    if(error) return res.status(400).send(error.details[0].message);
    
    let genre = await Genre.findByIdAndUpdate(req.params.id , {name:req.body.name});

    if (!genre) return res.status(400).send('genre with the ID not found')

    
     res.send(genre)
})

router.delete('/:id',async(req,res)=>{

    // const {error} = validate(req.body)
    // if(error) return res.status(400).send(error.details[0].message);

    let genre = await Genre.findByIdAndDelete(req.params.id);
    
    if (!genre) return res.status(400).send('genre with the ID not found')

    res.send(genre)

})





module.exports = router;
