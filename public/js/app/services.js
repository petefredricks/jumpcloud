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

			login: function( data, callback ) {
				Util.promiseHandler( $http.post( '/api/login', data ), callback );
			},

			signup: function( data, callback ) {
				Util.promiseHandler( $http.post( '/api/signup', data ), callback );
			},

			getStats: function( callback ) {
				Util.promiseHandler( $http.get( '/api/stats' ), callback );
			}

		};
	}]);

