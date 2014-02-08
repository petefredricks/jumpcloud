angular.module( 'services', [] )

	.factory( 'Util', [ function() {
		return {
			promiseHandler: function( promise, callback ) {
				promise
					.success( function( data ){
						callback( null, data );
					})
					.error(function( data ){
						callback( data );
					});
			},
			handleError: function ( err ) {
				switch ( err ) {
					case 'Not authenticated':
						location.href = '/login?error=authenticated';
				}
			}
		};
	}])

	.factory( 'Account', [ '$http', 'Util', function( $http, Util ) {

		return {

			login: function( callback ) {

			},


			signup: function( callback ) {

			}

		};
	}]);

