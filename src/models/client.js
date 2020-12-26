//user.JS defines the user model 
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Coach = require('../models/coach');

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
				throw new Error('Email is not invalid');
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
				throw new Error('Password cannot contain "password"');
			}
		}
	},
	birthDate: {
		type: Date,
		required: true,
		validate(value) {
			let dt1 = new Date();
			let dt3 = new Date(value);
			let dd = dt1.getDate();
			let mm = dt1.getMonth() + 1;

			var yyyy = dt1.getFullYear();
			if (dd < 10) {
				dd = '0' + dd;
			}
			if (mm < 10) {
				mm = '0' + mm;
			}
			var today = yyyy + '-' + mm + '-' + dd;
			dt1 = new Date(today);

			var diff = (dt1.getTime() - dt3.getTime()) / 1000;
			diff /= (60 * 60 * 24);
			if (Math.floor(((diff / 365.25))) < 18) {
				throw new Error('Age most be a > 18');
			}
		}
	},
	country: {
		type: String,
		trim: true
	},
	userType: {
		type: String,
		trim: true
	},
	gender: {
		type: String,
		trim: true
	},
	weight: {
		type: Number,
		required: true,
		validate(value) {
			if (value < 0) {
				throw new Error('Weight most be a positive number');
			}
		}
	},
	height: {
		type: Number,
		required: true,
		validate(value) {
			if (value < 0) {
				throw new Error('Height most be a positive number');
			}
		}
	},
	profilePic: {
		type: Buffer,
		// required: true
	},
	trainingSchedule: {
		sunday: {
			type: String,
			trim: true,
			default: 'Rest day'
		},
		monday: {
			type: String,
			trim: true,
			default: 'Rest day'
		},
		tuesday: {
			type: String,
			trim: true,
			default: 'Rest day'
		},
		wednesday: {
			type: String,
			trim: true,
			default: 'Rest day'
		},
		thursday: {
			type: String,
			trim: true,
			default: 'Rest day'
		},
		friday: {
			type: String,
			trim: true,
			default: 'Rest day'
		},
		saturday: {
			type: String,
			trim: true,
			default: 'Rest day'
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
		calories: {
			type: Number,
			default: 0
		},
		notes: {
			type: String,
			trim: true,
			default: 'Still dont have notes ...'
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
});

clientSchema.methods.generateAuthToken = async function () {
	const client = this;
	const token = jwt.sign({ _id: client._id.toString() }, process.env.JWT_SECRET);

	client.tokens = client.tokens.concat({ token });
	await client.save();
	return token;
};

clientSchema.statics.findByCredentials = async (email, password) => {
	const client = await Client.findOne({ email });
	if (!client) {
		throw new Error('Unable to login!');
	}

	const isMAtch = await bcrypt.compare(password, client.password);
	if (!isMAtch) {
		throw new Error('Unable to login');
	}

	return client;
};


// Hash the plain text password before saving
clientSchema.pre('save', async function (next) {
	// "This" gives us access to the individual user that's about to be saved.
	const client = this;

	if (client.isModified('password')) {//This will be true when the user is first created.And it will also be true if the user is being updated
		client.password = await bcrypt.hash(client.password, 8);
	}

	next();
});

// Before the client deleting itself -> Delete his ID from his coach
clientSchema.pre('remove', async function (next) {
	const client = this;
	try {
		const coach = await Coach.findById(client.coachID);
		coach.myClients = await coach.myClients.filter(function (value) {
			return !value.id.equals(client._id);
		});
		coach.save();
	} catch (e) {
		console.log(e);
	}
	next();
});

// Remove field from the profile respons
clientSchema.methods.toJSON = function () {
	const client = this;
	const clientObject = client.toObject();

	delete clientObject.password;
	delete clientObject.tokens;
	delete clientObject.nutrition;
	delete clientObject.trainingSchedule;
	return clientObject;
};
const Client = mongoose.model('Client', clientSchema);

module.exports = Client;