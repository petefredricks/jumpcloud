var fs = require( 'fs' );
var app = require( '../app' );
var async = require( 'async' );
var _ = require( 'underscore' );
var assets = require( '../lib/assets' );
var loginManager = require( '../lib/loginManager' );

/*** HELPER FUNCTIONS ***/

function checkAuth( req, res, next ) {

	loginManager.authenticate( req, function( err, authenticated ) {

		if ( authenticated ) {
			next();
		}
		else {
			res.redirect( '/login' );
		}
	});
}

/*** ROUTE FUNCTIONS ***/

function appAction( req, res ) {

	res.render( 'pages/app', {
		title: 'JumpCloud',
		paths: assets.getPaths( req, 'app' )
	});

}

/*** APP ROUTES ***/

var appRoutes = [
	'/'
];

_.each( appRoutes, function( route ) {
	app.get( route, checkAuth, appAction );
});

/*** PUBLIC ROUTES ***/

var publicRoutes = [
	'/login',
	'/signup'
];

_.each( publicRoutes, function( route ) {
	app.get( route, appAction );
});

app.get( '/logout', function( req, res ) {
	loginManager.destroyLogin( req, function() {
		res.redirect( '/login' );
	});
});
