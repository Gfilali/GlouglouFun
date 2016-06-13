
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	id: String,
	firstName: String,
	lastName: String,
	username: String,
	password: String,
	email: String,
	birthDate: String,
	country: String,
	numberPh: String,
	music: String,
	smoke: String,
	drink: String
		
});