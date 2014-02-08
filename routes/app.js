var fs = require( 'fs' );
var app = require( '../app' );
var async = require( 'async' );
var _ = require( 'underscore' );
var assets = require( '../lib/assets' );

/*** HELPER FUNCTIONS ***/

/*** ROUTE FUNCTIONS ***/

function appAction( req, res ) {

	res.render( 'pages/app', {
		title: 'AutoLink',
		paths: assets.getPaths( req, 'app' )
	});

}

/*** APP ROUTES ***/
var appRoutes = [
	'/app',
	'/app/welcome',
	'/app/welcome-search',
	'/app/welcome-advanced',
	'/app/welcome-options'
];

_.each( appRoutes, function( route ) {
	app.get( route, appAction );
});

/*** PUBLIC ROUTES ***/
var publicRoutes = [
	'/app/login',
	'/app/signup',
	'/app/passwordreset',
	'/app/resetconfirm'
];

_.each( publicRoutes, function( route ) {
	app.get( route, appAction );
});
