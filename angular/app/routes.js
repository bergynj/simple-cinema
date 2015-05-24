(function(){
	"use strict";

	angular.module('app.routes').config( function($stateProvider, $urlRouterProvider ) {

		var getView = function( viewName ){
			return '/views/app/' + viewName + '/' + viewName + '.html';
		};

		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('landing', {
			url: '/',
			views: {
				main: {
					templateUrl: getView('landing')
				}
			}
		}).state('cinema', {
			url: '/cinema',
			views: {
				main: {
					templateUrl: getView('cinema')
				},
				footer: {
					templateUrl: getView('footer')
				}
			}
		}).state('dashboard', {
			url: '/dashboard',
			views: {
				main: {
					templateUrl: getView('dashboard')
				},
				footer: {
					templateUrl: getView('footer')
				}
			}
		}).state('admin', {
			url: '/admin',
			views: {
				main: {
					templateUrl: getView('admin')
				},
				footer: {
					templateUrl: getView('footer')
				}
			}
		});


	} );
})();
