"use strict";

// Module Exports
module.exports = {
	authenticate: authenticate,
	destroyLogin: destroyLogin,
	rememberMe: rememberMe
};

/**
 * Checks the authentication for the user. Probably add more logic here.
 *
 * @param req
 * @param callback
 */
function authenticate( req, callback ) {

	if ( req.session.authenticated ) {
		callback( null, true );
	}
	else if ( req.cookies[ 'remember' ] ) {
		// could have remember me code here...
	}
	else {
		callback( 'Not authenticated' );
	}
}

/**
 * Save the userId to the login collection to stay logged in.
 *
 * @param userID
 * @param callback
 */
function rememberMe( userID, callback ) {

	// this where you would save to the database
		callback();
}

/**
 * Destroys the session for the user.
 *
 * @param req
 * @param callback
 */
function destroyLogin( req, callback ) {
	req.session.destroy( function() {
		callback();
	});
}

