angular.module( 'jumpcloud', [ 'controllers', 'directives', 'services', 'filters', 'ui.bootstrap', 'ngRoute', 'ngTouch' ])

	.config([ '$locationProvider', '$routeProvider', function( $locationProvider, $routeProvider ) {

		$locationProvider.html5Mode( true );

		$routeProvider
			.when('/', { templateUrl: 'templates/dashboard.html', controller: 'DashboardCtrl' })
			.when('/login', { templateUrl: 'templates/login.html', controller: 'LoginCtrl' })
			.when('/signup', { templateUrl: 'templates/signup.html', controller: 'LoginCtrl' })
	}]);