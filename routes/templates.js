var fs = require( 'fs' );
var app = require( '../app' );

function templateAction( req, res ) {

	var tmplName = req.params.name || '';
	var fileName = tmplName.substr( 0, tmplName.lastIndexOf( '.' ) ) + '.jade';

	fs.exists( app.get( 'rootdir' ) + '/views/templates/' + fileName, function( yes ) {
		if ( yes ) {
			res.render( 'templates/' + fileName, {
				hostname: app.get( 'hostname' )
			});
		}
		else {
			res.send( 404, 'Not a template' );
		}
	});
}

app.get( '/app/templates/:name', templateAction );

