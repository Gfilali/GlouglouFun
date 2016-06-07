
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	id: String,
	firstName: String,
	lastName: String,
	username: String,
	password: String,
	email: String
	
});