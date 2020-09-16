const express = require('express')
const router = express.Router()


const Park = require('../models/park.model')
const Coaster = require('../models/coaster.model')

// Aquí los endpoints


router.get('/', (req, res)=>{
    Coaster.find()
        .populate('park')
        .then(coasters => res.render('coasters/coasters-index', {coasters}))
        .catch(err => console.log("ERRORR", err))
})

router.get('/new', (req, res) => {

    Park.find()
        .then(parks => res.render('coasters/new-coaster', {parks}))
        .catch(err => console.log("ERRORR", err))

})

router.post('/new', (req, res)=>{
    const { name, description, inversions, length, active, park} = req.body

    Coaster.create({name, description, inversions, length, active, park})
        .then(() => res.redirect('/coasters/new'))
        .catch(err => console.log("ERRORR", err))
})

router.get('/:coaster_id', (req, res)=>{
    
    const id = req.params.coaster_id

    Coaster.findById(id)
        .populate('park')
        .then(coasterDetails => res.render('coasters/coaster-details', coasterDetails))
        .catch(err => console.log("ERRORR", err))
})



router.get('/delete/:coaster_id', (req, res)=>{
    const id = req.params.coaster_id
    Coaster.findByIdAndDelete(id)
        .then(()=> res.redirect('/coasters'))
        .catch(err => console.log("ERRORR", err))
})



router.get('/edit/:coaster_id', (req,res) => {

    let id = req.params.coaster_id

    Coaster.findById(id)
        
        .populate('park')
        .then(coastDetails => {
            console.log(coastDetails)
            res.render('coasters/coaster-edit', coastDetails)})
        .catch(err => console.log("ERRORR", err))

})

router.post('/edit/:coaster_id', (req, res) => {

    let id = req.params.coaster_id
    const { name, description, inversions, length, active} = req.body

    Coaster.findByIdAndUpdate(id, {name, description, inversions, length, active})
        .then(()=>res.redirect('/coasters'))
        .catch(err => console.log("ERRORR", err))

})





module.exports = router