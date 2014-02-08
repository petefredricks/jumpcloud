var fs = require( 'fs' );
var app = require( '../app' );
var mongoose = require( 'mongoose' );
var async = require( 'async' );
var nconf = require( 'nconf' );
var _ = require( 'underscore' );
var loginManager = require( '../lib/loginManager' );

// Models
var User = mongoose.model( 'User' );

/*** HELPER FUNCTIONS ***/

function checkAuth( req, res, next ) {

	loginManager.authenticate( req, function( err, authenticated ) {

		if ( authenticated ) {
			next();
		}
		else {
			res.send( 401, 'Not authenticated' );
		}
	});
}

function checkCredentials( email, password, callback ) {

	// make sure email is lower case
	email = email && email.toLowerCase();

	if ( email && password ) {

		User.findOne({ email: email }, function( err, user ) {

			if ( err ) {
				callback( 'Server error. Please try again shortly' );
			}
			else if ( user && user.authenticate( password ) ) {
				callback( null, user );
			}
			else {
				callback( 'Email or password is incorrect.' );
			}
		});
	}
	else {
		callback( 'You must provide an email and password.' );
	}
}

/*** ROUTE FUNCTIONS ***/

function createUser( req, res ) {

	var data = _.clone( req.body );

	data._password = data.password;
	data.created = new Date();

	User.create( data, function( err, user ) {

		if ( err ) {
			res.send( 500, err );
		}
		else {
			req.session.user = user.id;
			req.session.authenticated = true;
			res.json({ success: true, url: '/' });
		}
	});
}

function loginUser( req, res ) {

	var data = _.clone( req.body );

	// primary function is to check the credentials
	var waterfall = [ function( cb ) {
		checkCredentials( data.email, data.password, cb );
	}];

	// if user has selected "keep me logged in" then add the remember me hash
	// this is just here for show...
	if ( data.rememeberMe ) {

		waterfall.push( function( user, cb ) {

			loginManager.rememberMe( user._id, function( err, doc ) {

				if ( doc && doc.hash ) {
					res.cookie( nconf.get( 'app:rememberCookie' ), doc.hash, {
						expires: new Date( Date.now() + 365 * 86400000 * 40 ), // 40 years
						httpOnly: true
					});
				}

				cb( err, user );
			});
		});
	}

	// run the waterfall
	async.waterfall( waterfall, function( err, user ) {

		if ( err ) {
			res.send( 401, err );
		}
		else {
			req.session.user = user.id;
			req.session.authenticated = true;
			res.json({ success: true, url: '/' });
		}
	});
}

/**
 * Return some stats about the user
 * @param req
 * @param res
 */
function getStats( req, res ) {

	User.findById( req.session.user, function( err, user ) {
		if ( err ) {
			res.send( 500, err );
		}
		else {
			res.json({
				name: user.name,
				created: user.created
			});
		}
	})
}

/*** MAIN ROUTES ***/

// don't require auth
app.post( '/api/login', loginUser );
app.post( '/api/signup', createUser );

// require auth
app.get( '/api/stats', checkAuth, getStats );
