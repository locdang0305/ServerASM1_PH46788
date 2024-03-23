const express = require('express');

const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
    res.send('vao xu li api');
})
const mongoose = require('mongoose');

const carModel = require('./carModel');

const uri = 'mongodb+srv://locdhph46788:GSYKojokPTYz9hny@cluster0.utdnbcv.mongodb.net/asm_ph46788'

router.get('/list', async (req, res) => {
    await mongoose.connect(uri);

    let cars = await carModel.find();

    console.log(cars);

    res.send(cars);
})
router.post('/add_car', async (req, res) => {
    await mongoose.connect(uri);

    let car = req.body;

    await carModel.create(car);

    let cars = await carModel.find();

    res.send(cars);
})

