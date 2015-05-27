(function(){
	"use strict";

	var app = angular.module('app',
		[
		'app.controllers',
		'app.filters',
		'app.services',
		'app.directives',
		'app.routes',
		'app.config',
		]);

	angular.module('app.routes', ['ui.router', 'ngStorage']);
	angular.module('app.controllers', ['ui.router', 'ngMaterial', 'ngStorage', 'restangular']);
	angular.module('app.filters', []);
	angular.module('app.services', ['ui.router', 'ngStorage', 'restangular']);
	angular.module('app.directives', []);
	angular.module('app.config', []);

})();
(function(){
	"use strict";

	angular.module('app.routes').config( ["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider ) {

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


	}] );
})();

(function(){
	"use strict";

	angular.module('app.filters').filter( 'capitalize', function(){
		return function(input, all) {
			return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g,function(txt){
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			}) : '';
		};
	});
})();
(function(){
	"use strict";

	angular.module('app.filters').filter( 't', ["$filter", function( $filter ){
		return function( text ){
			text = $filter('translate')(text);
			return $filter('ucfirst')(text);
		};
	}]);
})();
(function(){
	"use strict";

	angular.module('app.filters').filter( 'trustHtml', ["$sce", function( $sce ){
		return function( html ){
			return $sce.trustAsHtml(html);
		};
	}]);
})();
(function(){
	"use strict";

	angular.module('app.filters').filter('ucfirst', function() {
		return function( input ) {
			if ( !input ){
				return null;
			}
			return input.substring(0, 1).toUpperCase() + input.substring(1);
		};
	});

})();

(function(){
	"use strict";

	angular.module('app.config').config( ["RestangularProvider", function(RestangularProvider) {
		RestangularProvider
		.setBaseUrl('/api/1/')
		.setDefaultHeaders({'X-CSRF-TOKEN': document.getElementById('csrf-token').value });
	}]);

})();
(function(){
	"use strict";

	angular.module('app.config').config( ["$mdThemingProvider", function($mdThemingProvider) {
		/* For more info, visit https://material.angularjs.org/#/Theming/01_introduction */
		$mdThemingProvider.theme('default')
		.primaryPalette('teal')
		.accentPalette('cyan')
		.warnPalette('red');
	}]);

})();
(function(){
	"use strict";

	angular.module('app.controllers')

        /**
        * @ngdoc
        * @name app
        * @type controller
        *
        * @description
        * Get cinema data with simple Angular $http service
        */
        .controller('CinemaCtrlService', ['$scope','$http', function($scope, $http) {
            // get data from API
            $http.get('/api/cinemas').success(function(data) {
                // 'this' in here refer to $http service object, must use store alias
                $scope.cinemas = data[0];
            });
        }])

        /**
        * @ngdoc
        * @name app
        * @type controller
        *
        * @description
        * Get cinema data with REST Restangular API
        */
        .controller('CinemaRestangularService', ['$scope','Restangular', function($scope, Restangular) {
            var resource = Restangular.all('/api/cinemas');
            resource.getList().then(function(cinemas){
                $scope.cinemas = cinemas;
            });
        }])

        /**
        * @ngdoc
        * @name app
        * @type controller
        *
        * @description
        * Sample cinema data using dummy JSON
        */
        .controller('CinemaCtrlDummy', ["$scope", function($scope) {
            $scope.cinemas = [{
                'id': 1,
                'name': 'Ritz Randwick',
                'address': '45 St Pauls Street, Randwick NSW 2031',
                'geo': [{
                        'lat': '',
                        'lang': '',
                    }],
              },
              {
                'id': 2,
                'name': 'Dendy Newtown',
                'address': '261-263 King Street, Newtown NSW 2042',
                'geo': [{
                        'lat': '',
                        'lang': '',
                    }],
              },
              {
                'id': 3,
                'name': 'Dendy Opera Quay',
                'address': 'Shop9, 2 East Circular Quay, Sydney NSW 2000',
                'geo': [{
                        'lat': '',
                        'lang': '',
                    }],
              }];
	    }]);
})();

(function(){
	"use strict";

	angular.module('app.controllers').controller('DashboardCtrl', ["$scope", function( $scope ){

	}]);

})();

(function(){
	"use strict";

	angular.module('app.controllers').controller('LandingCtrl', ["$scope", "$mdToast", "$mdDialog", function( $scope, $mdToast, $mdDialog ){

		// $scope.landingImage = 'http://i.imgur.com/XiMykki.png';
		$scope.landingImage = 'https://pbs.twimg.com/profile_images/1544854004/For_Facebook.JPG';

		$scope.toastNotification = function(){
			$mdToast.show(
				$mdToast.simple()
				.content('This is a toast notification!')
				.position('top right')
				.hideDelay(3000)
				);
		};

		$scope.showDialog = function( event ){
			$mdDialog.show(
				$mdDialog.alert()
				.parent(angular.element(document.body))
				.title('This is an alert title')
				.content('You can specify some description text in here.')
				.ariaLabel('Alert Dialog Demo')
				.ok('Got it!')
				.targetEvent(event)
				);
		};

	}]);

})();

(function(){
	"use strict";

	angular.module('app.controllers')
        .controller('MoviesCtrl', ["$scope", function($scope) {
            $scope.movies = [];
	    }])
        .controller('MoviesCtrlService', ['$http', function($http) {
            var movie = this;   // create an alias for this, to be used inside $http get
            movie.items = [];    // init store data

            $http.get('/api/movies').success(function(data) {
                // 'this' in here refer to $http service object, must use store alias
                movie.items = data;
            });
	}]);

})();

(function(){
	"use strict";

	angular.module('app.controllers')
        .controller('AddSessionAsyncController', ["$timeout", "$scope", function($timeout, $scope) {
            $scope.loadCinemas = function() {
                // Use timeout to simulate a 650ms request.
                $scope.cinemas = [];
                return $timeout(function() {
                    $scope.cinemas = [{
                        'id': 1,
                        'name': 'Ritz Randwick',
                        'address': '45 St Pauls Street, Randwick NSW 2031',
                        'geo': [{'lat': '', 'lang': ''}],
                      },
                      {
                        'id': 2,
                        'name': 'Dendy Newtown',
                        'address': '261-263 King Street, Newtown NSW 2042',
                        'geo': [{'lat': '', 'lang': ''}],
                      },
                      {
                        'id': 3,
                        'name': 'Dendy Opera Quay',
                        'address': 'Shop9, 2 East Circular Quay, Sydney NSW 2000',
                        'geo': [{'lat': '', 'lang': ''}],
                      }];

                }, 650);
            };

            $scope.loadCinemas = function() {
                // Use timeout to simulate a 650ms request.
                $scope.movies = [];
                return $timeout(function() {
                    /*$scope.movies = [

                    ];*/

                }, 650);
            };

        }])
        .controller('AddCtrl', ['$http', function($http) {

          // Simple POST request example (passing data) :
          $http.post('/someUrl', {msg:'hello word!'})
              .success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
              })
              .error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });

	   }]);

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tYWluLmpzIiwiYXBwL3JvdXRlcy5qcyIsImZpbHRlcnMvY2FwaXRhbGl6ZS5qcyIsImZpbHRlcnMvdHJhbnNsYXRpb25zLmpzIiwiZmlsdGVycy90cnVzdF9odG1sLmpzIiwiZmlsdGVycy91Y2ZpcnN0LmpzIiwiY29uZmlnL3Jlc3Rhbmd1bGFyLmpzIiwiY29uZmlnL3RoZW1lLmpzIiwiYXBwL2NpbmVtYXMvY2luZW1hcy5qcyIsImFwcC9kYXNoYm9hcmQvZGFzaGJvYXJkLmpzIiwiYXBwL2Zvb3Rlci9mb290ZXIuanMiLCJhcHAvbGFuZGluZy9sYW5kaW5nLmpzIiwiYXBwL21vdmllcy9tb3ZpZXMuanMiLCJhcHAvc2Vzc2lvbi9zZXNzaW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0dmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLFxuXHRcdFtcblx0XHQnYXBwLmNvbnRyb2xsZXJzJyxcblx0XHQnYXBwLmZpbHRlcnMnLFxuXHRcdCdhcHAuc2VydmljZXMnLFxuXHRcdCdhcHAuZGlyZWN0aXZlcycsXG5cdFx0J2FwcC5yb3V0ZXMnLFxuXHRcdCdhcHAuY29uZmlnJyxcblx0XHRdKTtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycsIFsndWkucm91dGVyJywgJ25nU3RvcmFnZSddKTtcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycsIFsndWkucm91dGVyJywgJ25nTWF0ZXJpYWwnLCAnbmdTdG9yYWdlJywgJ3Jlc3Rhbmd1bGFyJ10pO1xuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnLCBbXSk7XG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuc2VydmljZXMnLCBbJ3VpLnJvdXRlcicsICduZ1N0b3JhZ2UnLCAncmVzdGFuZ3VsYXInXSk7XG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycsIFtdKTtcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnLCBbXSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVzJykuY29uZmlnKCBmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyICkge1xuXG5cdFx0dmFyIGdldFZpZXcgPSBmdW5jdGlvbiggdmlld05hbWUgKXtcblx0XHRcdHJldHVybiAnL3ZpZXdzL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyB2aWV3TmFtZSArICcuaHRtbCc7XG5cdFx0fTtcblxuXHRcdCR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuXHRcdCRzdGF0ZVByb3ZpZGVyXG5cdFx0LnN0YXRlKCdsYW5kaW5nJywge1xuXHRcdFx0dXJsOiAnLycsXG5cdFx0XHR2aWV3czoge1xuXHRcdFx0XHRtYWluOiB7XG5cdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ2xhbmRpbmcnKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSkuc3RhdGUoJ2NpbmVtYXMnLCB7XG5cdFx0XHR1cmw6ICcvY2luZW1hcycsXG5cdFx0XHR2aWV3czoge1xuXHRcdFx0XHRtYWluOiB7XG5cdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NpbmVtYXMnKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRmb290ZXI6IHtcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pLnN0YXRlKCdkYXNoYm9hcmQnLCB7XG5cdFx0XHR1cmw6ICcvZGFzaGJvYXJkJyxcblx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdG1haW46IHtcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygnZGFzaGJvYXJkJylcblx0XHRcdFx0fSxcblx0XHRcdFx0Zm9vdGVyOiB7XG5cdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Zvb3RlcicpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KS5zdGF0ZSgnYWRkJywge1xuXHRcdFx0dXJsOiAnL2FkZCcsXG5cdFx0XHR2aWV3czoge1xuXHRcdFx0XHRtYWluOiB7XG5cdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ2FkZCcpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZvb3Rlcjoge1xuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdmb290ZXInKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblxuXHR9ICk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycpLmZpbHRlciggJ2NhcGl0YWxpemUnLCBmdW5jdGlvbigpe1xuXHRcdHJldHVybiBmdW5jdGlvbihpbnB1dCwgYWxsKSB7XG5cdFx0XHRyZXR1cm4gKCEhaW5wdXQpID8gaW5wdXQucmVwbGFjZSgvKFteXFxXX10rW15cXHMtXSopICovZyxmdW5jdGlvbih0eHQpe1xuXHRcdFx0XHRyZXR1cm4gdHh0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdHh0LnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0fSkgOiAnJztcblx0XHR9O1xuXHR9KTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycpLmZpbHRlciggJ3QnLCBmdW5jdGlvbiggJGZpbHRlciApe1xuXHRcdHJldHVybiBmdW5jdGlvbiggdGV4dCApe1xuXHRcdFx0dGV4dCA9ICRmaWx0ZXIoJ3RyYW5zbGF0ZScpKHRleHQpO1xuXHRcdFx0cmV0dXJuICRmaWx0ZXIoJ3VjZmlyc3QnKSh0ZXh0KTtcblx0XHR9O1xuXHR9KTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycpLmZpbHRlciggJ3RydXN0SHRtbCcsIGZ1bmN0aW9uKCAkc2NlICl7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCBodG1sICl7XG5cdFx0XHRyZXR1cm4gJHNjZS50cnVzdEFzSHRtbChodG1sKTtcblx0XHR9O1xuXHR9KTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycpLmZpbHRlcigndWNmaXJzdCcsIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBmdW5jdGlvbiggaW5wdXQgKSB7XG5cdFx0XHRpZiAoICFpbnB1dCApe1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBpbnB1dC5zdWJzdHJpbmcoMCwgMSkudG9VcHBlckNhc2UoKSArIGlucHV0LnN1YnN0cmluZygxKTtcblx0XHR9O1xuXHR9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycpLmNvbmZpZyggZnVuY3Rpb24oUmVzdGFuZ3VsYXJQcm92aWRlcikge1xuXHRcdFJlc3Rhbmd1bGFyUHJvdmlkZXJcblx0XHQuc2V0QmFzZVVybCgnL2FwaS8xLycpXG5cdFx0LnNldERlZmF1bHRIZWFkZXJzKHsnWC1DU1JGLVRPS0VOJzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NzcmYtdG9rZW4nKS52YWx1ZSB9KTtcblx0fSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJykuY29uZmlnKCBmdW5jdGlvbigkbWRUaGVtaW5nUHJvdmlkZXIpIHtcblx0XHQvKiBGb3IgbW9yZSBpbmZvLCB2aXNpdCBodHRwczovL21hdGVyaWFsLmFuZ3VsYXJqcy5vcmcvIy9UaGVtaW5nLzAxX2ludHJvZHVjdGlvbiAqL1xuXHRcdCRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXG5cdFx0LnByaW1hcnlQYWxldHRlKCd0ZWFsJylcblx0XHQuYWNjZW50UGFsZXR0ZSgnY3lhbicpXG5cdFx0Lndhcm5QYWxldHRlKCdyZWQnKTtcblx0fSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKVxuXG4gICAgICAgIC8qKlxuICAgICAgICAqIEBuZ2RvY1xuICAgICAgICAqIEBuYW1lIGFwcFxuICAgICAgICAqIEB0eXBlIGNvbnRyb2xsZXJcbiAgICAgICAgKlxuICAgICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAgICAqIEdldCBjaW5lbWEgZGF0YSB3aXRoIHNpbXBsZSBBbmd1bGFyICRodHRwIHNlcnZpY2VcbiAgICAgICAgKi9cbiAgICAgICAgLmNvbnRyb2xsZXIoJ0NpbmVtYUN0cmxTZXJ2aWNlJywgWyckc2NvcGUnLCckaHR0cCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHApIHtcbiAgICAgICAgICAgIC8vIGdldCBkYXRhIGZyb20gQVBJXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvY2luZW1hcycpLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIC8vICd0aGlzJyBpbiBoZXJlIHJlZmVyIHRvICRodHRwIHNlcnZpY2Ugb2JqZWN0LCBtdXN0IHVzZSBzdG9yZSBhbGlhc1xuICAgICAgICAgICAgICAgICRzY29wZS5jaW5lbWFzID0gZGF0YVswXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XSlcblxuICAgICAgICAvKipcbiAgICAgICAgKiBAbmdkb2NcbiAgICAgICAgKiBAbmFtZSBhcHBcbiAgICAgICAgKiBAdHlwZSBjb250cm9sbGVyXG4gICAgICAgICpcbiAgICAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgICAgKiBHZXQgY2luZW1hIGRhdGEgd2l0aCBSRVNUIFJlc3Rhbmd1bGFyIEFQSVxuICAgICAgICAqL1xuICAgICAgICAuY29udHJvbGxlcignQ2luZW1hUmVzdGFuZ3VsYXJTZXJ2aWNlJywgWyckc2NvcGUnLCdSZXN0YW5ndWxhcicsIGZ1bmN0aW9uKCRzY29wZSwgUmVzdGFuZ3VsYXIpIHtcbiAgICAgICAgICAgIHZhciByZXNvdXJjZSA9IFJlc3Rhbmd1bGFyLmFsbCgnL2FwaS9jaW5lbWFzJyk7XG4gICAgICAgICAgICByZXNvdXJjZS5nZXRMaXN0KCkudGhlbihmdW5jdGlvbihjaW5lbWFzKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2luZW1hcyA9IGNpbmVtYXM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfV0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICogQG5nZG9jXG4gICAgICAgICogQG5hbWUgYXBwXG4gICAgICAgICogQHR5cGUgY29udHJvbGxlclxuICAgICAgICAqXG4gICAgICAgICogQGRlc2NyaXB0aW9uXG4gICAgICAgICogU2FtcGxlIGNpbmVtYSBkYXRhIHVzaW5nIGR1bW15IEpTT05cbiAgICAgICAgKi9cbiAgICAgICAgLmNvbnRyb2xsZXIoJ0NpbmVtYUN0cmxEdW1teScsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICAgJHNjb3BlLmNpbmVtYXMgPSBbe1xuICAgICAgICAgICAgICAgICdpZCc6IDEsXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAnUml0eiBSYW5kd2ljaycsXG4gICAgICAgICAgICAgICAgJ2FkZHJlc3MnOiAnNDUgU3QgUGF1bHMgU3RyZWV0LCBSYW5kd2ljayBOU1cgMjAzMScsXG4gICAgICAgICAgICAgICAgJ2dlbyc6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAnbGF0JzogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGFuZyc6ICcnLFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICdpZCc6IDIsXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAnRGVuZHkgTmV3dG93bicsXG4gICAgICAgICAgICAgICAgJ2FkZHJlc3MnOiAnMjYxLTI2MyBLaW5nIFN0cmVldCwgTmV3dG93biBOU1cgMjA0MicsXG4gICAgICAgICAgICAgICAgJ2dlbyc6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAnbGF0JzogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGFuZyc6ICcnLFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICdpZCc6IDMsXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAnRGVuZHkgT3BlcmEgUXVheScsXG4gICAgICAgICAgICAgICAgJ2FkZHJlc3MnOiAnU2hvcDksIDIgRWFzdCBDaXJjdWxhciBRdWF5LCBTeWRuZXkgTlNXIDIwMDAnLFxuICAgICAgICAgICAgICAgICdnZW8nOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2xhdCc6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xhbmcnOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgIH1dO1xuXHQgICAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdEYXNoYm9hcmRDdHJsJywgZnVuY3Rpb24oICRzY29wZSApe1xuXG5cdH0pO1xuXG59KSgpOyIsIiIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTGFuZGluZ0N0cmwnLCBmdW5jdGlvbiggJHNjb3BlLCAkbWRUb2FzdCwgJG1kRGlhbG9nICl7XG5cblx0XHQvLyAkc2NvcGUubGFuZGluZ0ltYWdlID0gJ2h0dHA6Ly9pLmltZ3VyLmNvbS9YaU15a2tpLnBuZyc7XG5cdFx0JHNjb3BlLmxhbmRpbmdJbWFnZSA9ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvMTU0NDg1NDAwNC9Gb3JfRmFjZWJvb2suSlBHJztcblxuXHRcdCRzY29wZS50b2FzdE5vdGlmaWNhdGlvbiA9IGZ1bmN0aW9uKCl7XG5cdFx0XHQkbWRUb2FzdC5zaG93KFxuXHRcdFx0XHQkbWRUb2FzdC5zaW1wbGUoKVxuXHRcdFx0XHQuY29udGVudCgnVGhpcyBpcyBhIHRvYXN0IG5vdGlmaWNhdGlvbiEnKVxuXHRcdFx0XHQucG9zaXRpb24oJ3RvcCByaWdodCcpXG5cdFx0XHRcdC5oaWRlRGVsYXkoMzAwMClcblx0XHRcdFx0KTtcblx0XHR9O1xuXG5cdFx0JHNjb3BlLnNob3dEaWFsb2cgPSBmdW5jdGlvbiggZXZlbnQgKXtcblx0XHRcdCRtZERpYWxvZy5zaG93KFxuXHRcdFx0XHQkbWREaWFsb2cuYWxlcnQoKVxuXHRcdFx0XHQucGFyZW50KGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSlcblx0XHRcdFx0LnRpdGxlKCdUaGlzIGlzIGFuIGFsZXJ0IHRpdGxlJylcblx0XHRcdFx0LmNvbnRlbnQoJ1lvdSBjYW4gc3BlY2lmeSBzb21lIGRlc2NyaXB0aW9uIHRleHQgaW4gaGVyZS4nKVxuXHRcdFx0XHQuYXJpYUxhYmVsKCdBbGVydCBEaWFsb2cgRGVtbycpXG5cdFx0XHRcdC5vaygnR290IGl0IScpXG5cdFx0XHRcdC50YXJnZXRFdmVudChldmVudClcblx0XHRcdFx0KTtcblx0XHR9O1xuXG5cdH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKVxuICAgICAgICAuY29udHJvbGxlcignTW92aWVzQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICAgJHNjb3BlLm1vdmllcyA9IFtdO1xuXHQgICAgfSlcbiAgICAgICAgLmNvbnRyb2xsZXIoJ01vdmllc0N0cmxTZXJ2aWNlJywgWyckaHR0cCcsIGZ1bmN0aW9uKCRodHRwKSB7XG4gICAgICAgICAgICB2YXIgbW92aWUgPSB0aGlzOyAgIC8vIGNyZWF0ZSBhbiBhbGlhcyBmb3IgdGhpcywgdG8gYmUgdXNlZCBpbnNpZGUgJGh0dHAgZ2V0XG4gICAgICAgICAgICBtb3ZpZS5pdGVtcyA9IFtdOyAgICAvLyBpbml0IHN0b3JlIGRhdGFcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL21vdmllcycpLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIC8vICd0aGlzJyBpbiBoZXJlIHJlZmVyIHRvICRodHRwIHNlcnZpY2Ugb2JqZWN0LCBtdXN0IHVzZSBzdG9yZSBhbGlhc1xuICAgICAgICAgICAgICAgIG1vdmllLml0ZW1zID0gZGF0YTtcbiAgICAgICAgICAgIH0pO1xuXHR9XSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpXG4gICAgICAgIC5jb250cm9sbGVyKCdBZGRTZXNzaW9uQXN5bmNDb250cm9sbGVyJywgZnVuY3Rpb24oJHRpbWVvdXQsICRzY29wZSkge1xuICAgICAgICAgICAgJHNjb3BlLmxvYWRDaW5lbWFzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gVXNlIHRpbWVvdXQgdG8gc2ltdWxhdGUgYSA2NTBtcyByZXF1ZXN0LlxuICAgICAgICAgICAgICAgICRzY29wZS5jaW5lbWFzID0gW107XG4gICAgICAgICAgICAgICAgcmV0dXJuICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY2luZW1hcyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAnaWQnOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ25hbWUnOiAnUml0eiBSYW5kd2ljaycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnYWRkcmVzcyc6ICc0NSBTdCBQYXVscyBTdHJlZXQsIFJhbmR3aWNrIE5TVyAyMDMxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdnZW8nOiBbeydsYXQnOiAnJywgJ2xhbmcnOiAnJ31dLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogMixcbiAgICAgICAgICAgICAgICAgICAgICAgICduYW1lJzogJ0RlbmR5IE5ld3Rvd24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZHJlc3MnOiAnMjYxLTI2MyBLaW5nIFN0cmVldCwgTmV3dG93biBOU1cgMjA0MicsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZ2VvJzogW3snbGF0JzogJycsICdsYW5nJzogJyd9XSxcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdpZCc6IDMsXG4gICAgICAgICAgICAgICAgICAgICAgICAnbmFtZSc6ICdEZW5keSBPcGVyYSBRdWF5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdhZGRyZXNzJzogJ1Nob3A5LCAyIEVhc3QgQ2lyY3VsYXIgUXVheSwgU3lkbmV5IE5TVyAyMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdnZW8nOiBbeydsYXQnOiAnJywgJ2xhbmcnOiAnJ31dLFxuICAgICAgICAgICAgICAgICAgICAgIH1dO1xuXG4gICAgICAgICAgICAgICAgfSwgNjUwKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS5sb2FkQ2luZW1hcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIFVzZSB0aW1lb3V0IHRvIHNpbXVsYXRlIGEgNjUwbXMgcmVxdWVzdC5cbiAgICAgICAgICAgICAgICAkc2NvcGUubW92aWVzID0gW107XG4gICAgICAgICAgICAgICAgcmV0dXJuICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAvKiRzY29wZS5tb3ZpZXMgPSBbXG5cbiAgICAgICAgICAgICAgICAgICAgXTsqL1xuXG4gICAgICAgICAgICAgICAgfSwgNjUwKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgfSlcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0FkZEN0cmwnLCBbJyRodHRwJywgZnVuY3Rpb24oJGh0dHApIHtcblxuICAgICAgICAgIC8vIFNpbXBsZSBQT1NUIHJlcXVlc3QgZXhhbXBsZSAocGFzc2luZyBkYXRhKSA6XG4gICAgICAgICAgJGh0dHAucG9zdCgnL3NvbWVVcmwnLCB7bXNnOidoZWxsbyB3b3JkISd9KVxuICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgYXN5bmNocm9ub3VzbHlcbiAgICAgICAgICAgICAgICAvLyB3aGVuIHRoZSByZXNwb25zZSBpcyBhdmFpbGFibGVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgLy8gY2FsbGVkIGFzeW5jaHJvbm91c2x5IGlmIGFuIGVycm9yIG9jY3Vyc1xuICAgICAgICAgICAgICAgIC8vIG9yIHNlcnZlciByZXR1cm5zIHJlc3BvbnNlIHdpdGggYW4gZXJyb3Igc3RhdHVzLlxuICAgICAgICAgICAgICB9KTtcblxuXHQgICB9XSk7XG5cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
