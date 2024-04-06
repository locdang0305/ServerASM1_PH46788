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

const uri = 'mongodb+srv://locdhph46788:FszeNPgTfPiW6HkD@cluster0.utdnbcv.mongodb.net/asm_ph46788'

router.get('/list', async (req, res) => {
    await mongoose.connect(uri);
    try {
        const data = await carModel.find().populate();
        res.json({
            "status": 200,
            "messenger": "Danh sách xe",
            "data": data
        })
    } catch (error) {
        console.log(error);
    }
})
router.get('/search_car', async (req, res) => {
    try {
        const key = req.query.key
        const data = await carModel.find({name: {"$regex": key, "$options": "i"}}).populate()
            .sort({createdAt: -1});
        if (data) {
            res.json({
                "status": 200,
                "messenger": "Thành công",
                "data": data
            })
        } else {
            res.json({
                "status": 400,
                "messenger": "Lỗi, không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})
router.get('/sort_by_price', async (req, res) => {
    try {
        const order = req.query.order || 'asc';
        const data = await carModel.find().sort({price: order === 'desc' ? -1 : 1})
        if (data) {
            res.json({
                "status": 200,
                "messenger": "Thành công",
                "data": data
            })
        } else {
            res.json({
                "status": 400,
                "messenger": "Lỗi, không thành công",
                "data": []
            })
        }

    } catch (error) {
        console.log(error);
    }
});
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




