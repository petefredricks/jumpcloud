angular.module( 'filters', [] )

	.filter( 'timeAgo', [ function() {

		function generateString( diff, unit ) {
			return [ diff, ' ', unit, ( diff === 1 ? '' : 's' ), ' ago' ].join('');
		}

		return function( date ) {

			// must be instance of date, or something that can be converted to date
			if ( date && ( date instanceof Date || ( date = new Date( date ) ) ) ) {

				// start with the date difference in minutes
				var diff = Math.floor( ( new Date().getTime() - date.getTime() ) / 60000 );

				if ( diff < 1 ) {
					return 'just now'
				}

				if ( diff < 60 ) {
					return generateString( diff, 'minute' );
				}

				// convert difference to hours
				diff = Math.floor( diff / 60 );

				if ( diff < 24 ) {
					return generateString( diff, 'hour' );
				}

				// convert difference to days
				diff = Math.floor( diff / 24 );

				return generateString( diff, 'day' );
			}

			return '';
		}
	}]);