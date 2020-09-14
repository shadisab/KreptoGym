//user.JS defines the user model 
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Coach = require('../models/coach')

const clientSchema = new mongoose.Schema({
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
        default: 0,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Age most be a positive number')
            }
        }
    }, 
    userType:{
        type:String,
        trim: true
    }, 
    weight: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Weight most be a positive number')
            }
        }
    },
    height: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Height most be a positive number')
            }
        }
    }
    ,
    trainingSchedule: {
        sunday: {
            type: String,
            trim: true
        },
        monday: {
            type: String,
            trim: true
        },
        tuesday: {
            type: String,
            trim: true
        },
        wednesday: {
            type: String,
            trim: true
        },
        thursday: {
            type: String,
            trim: true
        },
        friday: {
            type: String,
            trim: true
        }
    },
    nutrition: {
        protine: {
            type: Number,
            default: 0
        },
        carbs: {
            type: Number,
            default: 0

        },
        fats: {
            type: Number,
            default: 0

        },
        notes: {
            type: String,
            trim: true
        }
    },
    tokens: [{  //value always provided by the server
        token: {
            type: String,
            required: true
        }
    }],
    coachID: { // Coach who train this client
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

/* Bring the task of the user */
/* Well what we're not going to do is actually create a tasks array on the User model so up above for example
we do create a tokens array to store those tokens.
We're not going to do the same thing for tasks the tasks live in a separate collection.
Instead what we're going to do is set up what's known as a virtual property a virtual property is not
actual data stored in the database.It's a relationship between two entities. */
// clientSchema.virtual('tasks', { //This is not stored in the database It is just for Mongoose to be able to figure out who owns what and how they're related.
//     ref: 'Task',
//     localField: '_id', // local field is that is where that local data is stored.
//     foreignField: 'owner' //foreign field is the name of the field on the other thing 

// })

clientSchema.methods.generateAuthToken = async function () {
    const client = this
    const token = jwt.sign({ _id: client._id.toString() }, process.env.JWT_SECRET)

    client.tokens = client.tokens.concat({ token })
    await client.save()
    return token
}

clientSchema.statics.findByCredentials = async (email, password) => {
    const client = await Client.findOne({ email })
    if (!client) {
        throw new Error('Unable to login!')
    }

    const isMAtch = await bcrypt.compare(password, client.password)
    if (!isMAtch) {
        throw new Error('Unable to login')
    }

    return client
}


// Hash the plain text password before saving
clientSchema.pre('save', async function (next) {
    // "This" gives us access to the individual user that's about to be saved.
    const client = this

    if (client.isModified('password')) {//This will be true when the user is first created.And it will also be true if the user is being updated
        client.password = await bcrypt.hash(client.password, 8)
    }

    next()
})

// Before the client deleting itself -> Delete his ID from his coach
clientSchema.pre('remove', async function (next) {
    const client = this
    try {
        const coach = await Coach.findById(client.coachID)
        coach.myClients = coach.myClients.filter(function (value, index, arr) {
            return    !value.id.equals(client._id);
        })
        coach.save()
        // await Coach.
        //    findByIdAndUpdate(
        //          client.coachID, { $pull: { 'clientsID': { _id:client._id } } })
        //  coach.save()
    } catch (e) {
        console.log(e);
    }
    next()
})

// Remove field from the profile respons
clientSchema.methods.toJSON = function () {
    const client = this
    const clientObject = client.toObject()

    delete clientObject.password
    delete clientObject.tokens
    delete clientObject.nutrition
    delete clientObject.trainingSchedule
    return clientObject
}
const Client = mongoose.model('Client', clientSchema)

module.exports = Client