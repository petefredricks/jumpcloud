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

		$rootScope.$on( "toggleLoading", function( ev, val ) {
			$rootScope.showPageLoading = typeof val == 'boolean' ? val : !$rootScope.showPageLoading;
		});

	}])

	.controller( 'DashboardCtrl', [ '$scope', 'Account', 'Util', function( $scope, Account, Util ) {

		$scope.logout = function() {
			location.href = '/logout';
		};

		// called when the controller is instantiated
		$scope.init = function() {

			$scope.$emit( 'toggleLoading', true );

			Account.getStats( function( err, data ) {

				if ( err ) {
					Util.handleError( err );
				}
				else {
					$scope.$emit( 'toggleLoading', false );
					$scope.stats = data;
				}
			});
		};

		$scope.init();

	}])

	// controls the initial login form
	.controller( 'LoginCtrl', [ '$scope', '$location', 'Account',  function( $scope, $location, Account ) {

		$scope.login = {};

		$scope.submit = function( ev ) {

			ev.preventDefault();

			$scope.$emit( 'toggleLoading', true );
			$scope.loginError = '';

			// make sure the autofill is populated
			$scope.$broadcast( 'autofill:update' );

			// make the call to the server for authentication
			Account.login({
					email: $scope.login.email,
					password: $scope.login.password
				},
				function( err, data ) {

					$scope.login.password = '';

					if ( err ) {
						$scope.$emit( 'toggleLoading', false );
						$scope.loginError = err;
					}
					else {
						location.href = data.url || '/';
					}
				});
		};

		$scope.showSignup = function() {
			$location.path( '/signup' );
		};

		$scope.logIn = function() {
			$location.path( '/' );
		};

	}])

	.controller( 'SignupCtrl', [ '$scope', '$location', 'Account', function( $scope, $location, Account ) {

		var required = [ 'name', 'email' ];

		$scope.signup = {};

		// validate the fields and post to server
		$scope.validate = function() {

			$scope.invalidFields = [];
			$scope.$emit( 'toggleLoading', true );

			// check required fields
			for ( var i = 0; i < required.length; i++ ) {

				if ( !$scope.signup[ required[ i ] ] ) {
					$scope.invalidFields.push( required[ i ] );
				}
			}

			// check password length
			if ( !$scope.signup.password || $scope.signup.password.length < 5 ) {
				$scope.invalidFields.push( 'password' );
			}

			// ..continue if there are no invalid fields
			if ( !$scope.invalidFields.length ) {

				Account.signup( $scope.signup, function( err, data ) {

					if ( err ) {
						$scope.showError = true;
						$scope.$emit( 'toggleLoading', false );
					}
					else {
						location.href = data.url || '/';
					}
				});
			}
			else {
				$scope.$emit( 'toggleLoading', false );
			}
		};

		$scope.showLogin = function() {
			$location.path( '/login' );
		};

		// start the creation process
		$scope.submit = function( ev ) {
			ev.preventDefault();
			$scope.validate();
		};

		$scope.checkError = function( name ) {
			return _.contains( $scope.invalidFields, name ) ? 'error' : '';
		};

	}]);