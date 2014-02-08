angular.module( 'controllers', [])

	.controller( 'AppCtrl', [ '$rootScope', 'Util', function( $rootScope, Util ) {

		$rootScope.$on( "$routeChangeError", function( event, current, previous, rejection ) {
			Util.handleError( rejection.data );
		});

		$rootScope.$on( "$routeChangeStart", function() {
			$rootScope.showPageLoading = true;
		});

		$rootScope.$on( "$routeChangeSuccess", function() {
			$rootScope.showPageLoading = false;
		});

	}])

	// controls the initial login form
	.controller( 'LoginCtrl', [ '$scope', '$location', function( $scope, $location ) {

		$scope.showSignup = function() {
			$location.path( '/signup' );
		};

		$scope.showIndex = function() {
			$location.path( '/login' );
		};

		$scope.logIn = function() {
			$location.path( '/' );
		};

	}]);