angular.module( 'directives', [] )

	.directive( 'windowResize', [ '$document', '$window', function ( $document, $window ) {

		return {
			restrict: 'A',
			link: function( scope ) {

				var win = $( $window );

				function setValues() {
					scope.windowWidth = $document.width();
					scope.windowHeight = win.height();
					scope.isMobile = ( scope.windowWidth < 768 );
					scope.isTablet = ( scope.windowWidth >= 768 && scope.windowWidth < 992 );
					scope.$broadcast( 'resize', scope.windowWidth, scope.windowHeight );
				}

				setValues();

				win.bind( 'resize', function () {
					scope.$apply( setValues );
				});
			}
		}
	}])

	.directive( 'pageLoader', [ function() {
		return {
			restrict: 'E',
			template: '<div class="page-loading ng-cloak"><div class="filter"></div><i class="fa fa-spinner fa-spin"></i></div>',
			replace: true
		}
	}])

	.directive( 'customSelect', [ function () {

		return {
			restrict: 'A',
			transclude: true,
			replace: true,
			scope: {
				model: '=customSelect'
			},
			template: '<div class="custom-select">' +
									'<div class="custom-value">' +
										'<span></span>' +
										'<i class="fa fa-angle-down"></i>' +
										'<select ng-model="model" ng-transclude>' +
											'<option value="">--select--</option>' +
										'</select>' +
									'</div>' +
								'</div>',

			link: function( scope, element ) {

				var display = element.find( '.custom-value span' );
				var select = element.find( 'select' );
				var opt = element.find( 'option:selected' );

				display.text( opt.text() );

				scope.$watch( 'model', function() {
					var opt = select.find( 'option:selected' );
					display.text( opt.text() );
				});
			}
		}
	}])

	.directive( 'customCheckbox', [ function () {

		return {
			restrict: 'C',
			scope: {
				model: '=',
				label: '@'
			},
			template: '<div class="check-box">' +
									'<i class="fa fa-check" ng-show="model"></i>' +
								'</div>' +
								'<label>' +
									'<input type="checkbox" ng-model="model"> {{label}}' +
								'</label>'
		}
	}]);