const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const coachSchema = new mongoose.Schema({
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
		minlength: 7,
		trim: true,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('Password cannot contain "password"');
			}
		}
	},
	status:{
		type:String,
		trim: true,
		default: 'Testing'
	}, 
	userType:{
		type:String,
		trim: true
	},
	tokens: [{  //value always provided by the server
		token: {
			type: String,
			required: true
		}
	}],
	TerminationCertificate:{
		type: Buffer,
		// required: true
	},
	myClients: [{ //Clients ID's with this
		id: { type: mongoose.Schema.Types.ObjectId }
	}],
	NewClientsREQ: [{ //Clients ID's with this
		id: { type: mongoose.Schema.Types.ObjectId }
	}]
}, {
	timestamps: true
});

coachSchema.methods.generateAuthToken = async function () {
	const coach = this;
	const token = jwt.sign({ _id: coach._id.toString() }, process.env.JWT_SECRET);

	coach.tokens = coach.tokens.concat({ token });
	await coach.save();
	return token;
};

coachSchema.statics.findByCredentials = async (email, password) => {
	const coach = await Coach.findOne({ email });
	if (!coach) {
		throw new Error('Unable to login!');
	}

	const isMAtch = await bcrypt.compare(password, coach.password);
	if (!isMAtch) {
		throw new Error('Unable to login');
	}
	return coach;
};


// Hash the plain text password before saving
coachSchema.pre('save', async function (next) {
	// "This" gives us access to the individual user that's about to be saved.
	const coach = this;

	if (coach.isModified('password')) {//This will be true when the user is first created.And it will also be true if the user is being updated
		coach.password = await bcrypt.hash(coach.password, 8);
	}

	next();
});

// Remove field from the profile respons
coachSchema.methods.toJSON = function () {
	const coach = this;
	const coachObject = coach.toObject();

	delete coachObject.password;
	delete coachObject.tokens;
	delete coachObject.myClients;
	delete coachObject.TerminationCertificate;

	return coachObject;
};

const Coach = mongoose.model('Coach', coachSchema);
module.exports = Coach;