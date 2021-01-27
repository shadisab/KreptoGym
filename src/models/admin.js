//user.JS defines the user model 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		minlength: 7,
		trim: true
	},
	tokens: [{  //value always provided by the server
		token: {
			type: String,
			required: true
		}
	}],
}, {
	timestamps: true
});

adminSchema.methods.generateAuthToken = async function () {
	const admin = this;
	const token = jwt.sign({ _id: admin._id.toString() }, process.env.JWT_SECRET);

	admin.tokens = admin.tokens.concat({ token });
	await admin.save();
	return token;
};

adminSchema.statics.findByCredentials = async (name, password) => {
	const admin = await Admin.findOne({ name });
	if (!admin) {
		throw new Error('Unable to login!');
	}
	const isMAtch = await bcrypt.compare(password, admin.password);
	if (!isMAtch) {
		throw new Error('Unable to login');
	}

	return admin;
};

// Hash the plain text password before saving
adminSchema.pre('save', async function (next) {
	// "This" gives us access to the individual user that's about to be saved.
	const admin = this;

	if (admin.isModified('password')) {//This will be true when the user is first created.And it will also be true if the user is being updated
		admin.password = await bcrypt.hash(admin.password, 8);
	}

	next();
});

// Remove field from the profile respons
adminSchema.methods.toJSON = function () {
	const admin = this;
	const adminObject = admin.toObject();

	return adminObject;
};
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;