"use strict";

// User Model

var mongoose = require( 'mongoose' );
var crypto = require( 'crypto' );
var Types = mongoose.Schema.Types;
var prefix = 'User';

var User = new mongoose.Schema({

	name: 			{ type: String },
	created: 		{ type: Date },
	email: {
		type: String,
		lowercase: true,
		unique: true
	},

	// private
	_salt: { type: String },
	_password: {
		type: String,
		set: function( password ) {
			this._salt = this.makeSalt();
			return this.encryptPassword( password );
		}
	}
});

User.methods = {
	encryptPassword: function( password ) {
		return crypto.createHmac( 'sha1', this._salt ).update( password ).digest( 'hex' );
	},
	authenticate: function( plainText ) {
		return this.encryptPassword( plainText ) === this._password;
	},
	makeSalt: function() {
		return Math.round( new Date().valueOf() * Math.random() ) + '';
	}
};

mongoose.model( prefix, User );
