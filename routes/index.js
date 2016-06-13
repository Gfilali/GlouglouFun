var express = require('express');
var router = express.Router();
var User = require('../models/user');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

var updateBDD = function (req,res){
  User.findOne({ 'username' :  req.param('username') }, function (err, User) {
  if (err) return handleError(err);
  
  User.email=req.param('email');
  User.firstName=req.param('firstName');
  User.lastName=req.param('lastName');
  User.birthDate=req.param('birthDate');
  User.username=req.param('username');
  User.country=req.param('country');
  User.numberPh=req.param('numberPh');
  User.drink=req.param('drink');
  User.music=req.param('music');
  User.smoke=req.param('smoke');
  
  User.save(function (err) {
    if (err) return handleError(err);
    res.send(User);
  });
});
}

module.exports = function(passport){
	
	/* GET Home (logout) Page */
	router.get('/', function(req, res){
		res.render('logout/pages/home', { message: req.flash('message') });
	});
	/* GET signin Page */
	router.get('/signin', function(req, res){
		res.render('logout/pages/signin', { message: req.flash('message') });
	});
	/* GET signup Page */
	router.get('/ongletsignup', function(req, res){
		res.render('logout/pages/signup', { message: req.flash('message') });
	});
	/* GET Home (login) Page */
	router.get('/logHome',isAuthenticated, function(req, res){
		res.render('login/pages/home', { user: req.user });
	});
	
	router.get('/logProfil', function(req, res){
		res.render('login/pages/profil', { user: req.user });
	});
	
	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/logHome',
		failureRedirect: '/signin',
		failureFlash : true  
	}));

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/logHome',
		failureRedirect: '/ongletsignup',
		failureFlash : true  
	}));

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	router.post('/update', function(req, res) {
		updateBDD(req,res);
		res.redirect('/logProfil');
	});

	return router;
}





