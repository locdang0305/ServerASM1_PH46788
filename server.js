const express = require('express');

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log('Server chay o cong: ' + port);
})

const mongoose = require('mongoose');

const carModel = require('./carModel');

const uri = 'mongodb+srv://locdhph46788:GSYKojokPTYz9hny@cluster0.utdnbcv.mongodb.net/asm_ph46788'

const api = require('./api');
app.use('/api', api);

app.get('/', async (req, res) => {
    await mongoose.connect(uri);
    console.log('Ket noi thanh cong!');

    let cars = await carModel.find({});

    res.send(cars)

})
app.post('/add_car', async (req, res) => {
    await mongoose.connect(uri);

    let car = req.body;

    await carModel.create(car);

    let cars = await carModel.find();

    res.send(cars);
})
app.get('/del_car/:id', async (req, res) => {
    await mongoose.connect(uri);

    let id = req.params.id;

    await carModel.deleteOne({_id: id});

    res.redirect('../')
})
app.put('/update_car/:id', async (req, res) => {

    await mongoose.connect(uri);

    let id = req.params.id;

    let newName = 'New Car';

    await carModel.updateOne({_id: id}, {name: newName});

    let cars = await carModel.find({});

    res.send(cars);
})
