const express = require('express');

const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
    res.send('vao xu li api');
})
const mongoose = require('mongoose');

const bodyParser = require("body-parser");

router.use(bodyParser.json());

router.use(bodyParser.urlencoded({extended: true}));

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
router.delete('/del_car/:id', async (req, res) => {
    await mongoose.connect(uri);

    let id = req.params.id;

    await carModel.deleteOne({_id: id});

    let cars = await carModel.find();

    res.send(cars);

})
router.put('/update_car/:id', async (req, res) => {

    await mongoose.connect(uri);

    let id = req.params.id;

    let car = req.body;

    await carModel.updateOne({_id: id}, car);

    let cars = await carModel.find({});

    res.send(cars);
})

