const mongoose = require('mongoose')


const nutritionSchema = new mongoose.Schema({
    ownerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    protine: {
        type: Number,
        required: true
    },
    carbs: {
        type: Number,
        required: true
    },
    fats: {
        type: Number,
        required: true
    },
    notes:{
        type: String,
        trim: true
    }
})

const Nutrition = mongoose.model('Nutrition', nutritionSchema)