const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Age most a positive number')
            }
        }
    },
    // tokens: [{  //value always provided by the server
    //     token: {
    //         type: String,
    //         required: true
    //     }
    // }],
    // avatar: {
    //     type: Buffer /* allow us to store the buffer with our binary image data 
    //                  right in the database alongside of the user who the image belongs to.*/
    // }
}, {
    timestamps: true
})

const User = mongoose.model('Client', userSchema)
module.exports = User