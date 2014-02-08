"use strict";

// try loading environmental configs
var nconf = require( 'nconf' );
var NODE_ENV = process.env.NODE_ENV || 'development';
nconf.file( 'env', __dirname + '/config/' + NODE_ENV + '.json' );
nconf.file( 'default', __dirname + '/config/default.json' );

var express = require( 'express' );
var http = require( 'http' );
var path = require( 'path' );
var app = module.exports = express();
var stylus = require( 'stylus' );
var nib = require( 'nib' );

// database setup
require( 'mongoose' ).connect( nconf.get( 'database:url' ) );
require( './models' ).init();

// all environments
app.set( 'rootdir', __dirname );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'jade' );
app.use( express.bodyParser() );
app.use( express.methodOverride() );
app.use( express.cookieParser( nconf.get( 'app:cookieSecret' ) ) );
app.use( express.session({
	secret: nconf.get( 'app:sessionSecret' ),
	store: app.sessionStore // <--- normally use Redis for sessions
}));

// development only
if ( 'development' == app.get('env') ) {
	app.use( stylus.middleware({
		src: __dirname + '/stylus/',
		dest: __dirname + '/public/',
		compile: function( str, path ) {
			return stylus( str )
				.set( 'filename', path )
				.use( nib() );
		}
	}));

	app.use( express.logger( 'dev' ) );
	app.use( express.errorHandler() );
}

// app router
app.use( app.router );

// handing static assets
app.use( express.static( path.join( __dirname, 'public' ) ) );

// define the routes for the application
require( './routes' );