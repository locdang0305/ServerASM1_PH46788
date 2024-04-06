const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    statuss: {
        type: Boolean,
        require: true
    },
    image: {
        type: Array,
    }
})

const carModel = mongoose.model('car', carSchema);

module.exports = carModel
