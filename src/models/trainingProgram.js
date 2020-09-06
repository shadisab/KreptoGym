const mongoose = require('mongoose')


const trainingSchema = new mongoose.Schema({
    ownerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sunday: [{
        bodyType: {
         type: String,
         required: true,
         trim: true   
         },
         exercises:{
             type: String,
             trim: true
         }
    }],
    monday: [{
        bodyType: {
         type: String,
         required: true,
         trim: true   
         },
         exercises:{
             type: String,
             trim: true
         }
    }],
    tuesday: [{
        bodyType: {
         type: String,
         required: true,
         trim: true   
         },
         exercises:{
             type: String,
             trim: true
         }
    }],
    wednesday: [{
        bodyType: {
         type: String,
         required: true,
         trim: true   
         },
         exercises:{
             type: String,
             trim: true
         }
    }],
    thursday: [{
        bodyType: {
         type: String,
         required: true,
         trim: true   
         },
         exercises:{
             type: String,
             trim: true
         }
    }],
    friday: [{
        bodyType: {
         type: String,
         required: true,
         trim: true   
         },
         exercises:{
             type: String,
             trim: true
         }
    }],
    saturday: [{
        bodyType: {
         type: String,
         required: true,
         trim: true   
         },
         exercises:{
             type: String,
             trim: true
         }
    }]
})

const Training = mongoose.model('Training', trainingSchema)
module.exports = Training