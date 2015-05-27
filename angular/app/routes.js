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
		}).state('cinemas', {
			url: '/cinemas',
			views: {
				main: {
					templateUrl: getView('cinemas')
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
		}).state('add', {
			url: '/add',
			views: {
				main: {
					templateUrl: getView('add')
				},
				footer: {
					templateUrl: getView('footer')
				}
			}
		});


	} );
})();
