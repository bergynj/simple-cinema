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
        .controller('CinemaCtrlService', ['$scope','$http', function($scope, $http) {
            // get data from API
            $http.get('/api/cinemas').success(function(data) {
                // 'this' in here refer to $http service object, must use store alias
                $scope.cinemas = data[0];
            });

        }])
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tYWluLmpzIiwiYXBwL3JvdXRlcy5qcyIsImZpbHRlcnMvY2FwaXRhbGl6ZS5qcyIsImZpbHRlcnMvdHJhbnNsYXRpb25zLmpzIiwiZmlsdGVycy90cnVzdF9odG1sLmpzIiwiZmlsdGVycy91Y2ZpcnN0LmpzIiwiY29uZmlnL3Jlc3Rhbmd1bGFyLmpzIiwiY29uZmlnL3RoZW1lLmpzIiwiYXBwL2NpbmVtYXMvY2luZW1hcy5qcyIsImFwcC9mb290ZXIvZm9vdGVyLmpzIiwiYXBwL2Rhc2hib2FyZC9kYXNoYm9hcmQuanMiLCJhcHAvc2Vzc2lvbi9zZXNzaW9uLmpzIiwiYXBwL2xhbmRpbmcvbGFuZGluZy5qcyIsImFwcC9tb3ZpZXMvbW92aWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHR2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsXG5cdFx0W1xuXHRcdCdhcHAuY29udHJvbGxlcnMnLFxuXHRcdCdhcHAuZmlsdGVycycsXG5cdFx0J2FwcC5zZXJ2aWNlcycsXG5cdFx0J2FwcC5kaXJlY3RpdmVzJyxcblx0XHQnYXBwLnJvdXRlcycsXG5cdFx0J2FwcC5jb25maWcnLFxuXHRcdF0pO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVzJywgWyd1aS5yb3V0ZXInLCAnbmdTdG9yYWdlJ10pO1xuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJywgWyd1aS5yb3V0ZXInLCAnbmdNYXRlcmlhbCcsICduZ1N0b3JhZ2UnLCAncmVzdGFuZ3VsYXInXSk7XG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycsIFtdKTtcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5zZXJ2aWNlcycsIFsndWkucm91dGVyJywgJ25nU3RvcmFnZScsICdyZXN0YW5ndWxhciddKTtcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJywgW10pO1xuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycsIFtdKTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnKS5jb25maWcoIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIgKSB7XG5cblx0XHR2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uKCB2aWV3TmFtZSApe1xuXHRcdFx0cmV0dXJuICcvdmlld3MvYXBwLycgKyB2aWV3TmFtZSArICcvJyArIHZpZXdOYW1lICsgJy5odG1sJztcblx0XHR9O1xuXG5cdFx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG5cdFx0JHN0YXRlUHJvdmlkZXJcblx0XHQuc3RhdGUoJ2xhbmRpbmcnLCB7XG5cdFx0XHR1cmw6ICcvJyxcblx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdG1haW46IHtcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygnbGFuZGluZycpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KS5zdGF0ZSgnY2luZW1hcycsIHtcblx0XHRcdHVybDogJy9jaW5lbWFzJyxcblx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdG1haW46IHtcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygnY2luZW1hcycpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZvb3Rlcjoge1xuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdmb290ZXInKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSkuc3RhdGUoJ2Rhc2hib2FyZCcsIHtcblx0XHRcdHVybDogJy9kYXNoYm9hcmQnLFxuXHRcdFx0dmlld3M6IHtcblx0XHRcdFx0bWFpbjoge1xuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdkYXNoYm9hcmQnKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRmb290ZXI6IHtcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pLnN0YXRlKCdhZGQnLCB7XG5cdFx0XHR1cmw6ICcvYWRkJyxcblx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdG1haW46IHtcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygnYWRkJylcblx0XHRcdFx0fSxcblx0XHRcdFx0Zm9vdGVyOiB7XG5cdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Zvb3RlcicpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblxuXG5cdH0gKTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCAnY2FwaXRhbGl6ZScsIGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGlucHV0LCBhbGwpIHtcblx0XHRcdHJldHVybiAoISFpbnB1dCkgPyBpbnB1dC5yZXBsYWNlKC8oW15cXFdfXStbXlxccy1dKikgKi9nLGZ1bmN0aW9uKHR4dCl7XG5cdFx0XHRcdHJldHVybiB0eHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0eHQuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR9KSA6ICcnO1xuXHRcdH07XG5cdH0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCAndCcsIGZ1bmN0aW9uKCAkZmlsdGVyICl7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCB0ZXh0ICl7XG5cdFx0XHR0ZXh0ID0gJGZpbHRlcigndHJhbnNsYXRlJykodGV4dCk7XG5cdFx0XHRyZXR1cm4gJGZpbHRlcigndWNmaXJzdCcpKHRleHQpO1xuXHRcdH07XG5cdH0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCAndHJ1c3RIdG1sJywgZnVuY3Rpb24oICRzY2UgKXtcblx0XHRyZXR1cm4gZnVuY3Rpb24oIGh0bWwgKXtcblx0XHRcdHJldHVybiAkc2NlLnRydXN0QXNIdG1sKGh0bWwpO1xuXHRcdH07XG5cdH0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCd1Y2ZpcnN0JywgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCBpbnB1dCApIHtcblx0XHRcdGlmICggIWlucHV0ICl7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGlucHV0LnN1YnN0cmluZygwLCAxKS50b1VwcGVyQ2FzZSgpICsgaW5wdXQuc3Vic3RyaW5nKDEpO1xuXHRcdH07XG5cdH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJykuY29uZmlnKCBmdW5jdGlvbihSZXN0YW5ndWxhclByb3ZpZGVyKSB7XG5cdFx0UmVzdGFuZ3VsYXJQcm92aWRlclxuXHRcdC5zZXRCYXNlVXJsKCcvYXBpLzEvJylcblx0XHQuc2V0RGVmYXVsdEhlYWRlcnMoeydYLUNTUkYtVE9LRU4nOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3NyZi10b2tlbicpLnZhbHVlIH0pO1xuXHR9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnKS5jb25maWcoIGZ1bmN0aW9uKCRtZFRoZW1pbmdQcm92aWRlcikge1xuXHRcdC8qIEZvciBtb3JlIGluZm8sIHZpc2l0IGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhcmpzLm9yZy8jL1RoZW1pbmcvMDFfaW50cm9kdWN0aW9uICovXG5cdFx0JG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0Jylcblx0XHQucHJpbWFyeVBhbGV0dGUoJ3RlYWwnKVxuXHRcdC5hY2NlbnRQYWxldHRlKCdjeWFuJylcblx0XHQud2FyblBhbGV0dGUoJ3JlZCcpO1xuXHR9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpXG4gICAgICAgIC5jb250cm9sbGVyKCdDaW5lbWFDdHJsU2VydmljZScsIFsnJHNjb3BlJywnJGh0dHAnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwKSB7XG4gICAgICAgICAgICAvLyBnZXQgZGF0YSBmcm9tIEFQSVxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2NpbmVtYXMnKS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAvLyAndGhpcycgaW4gaGVyZSByZWZlciB0byAkaHR0cCBzZXJ2aWNlIG9iamVjdCwgbXVzdCB1c2Ugc3RvcmUgYWxpYXNcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2luZW1hcyA9IGRhdGFbMF07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XSlcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0NpbmVtYUN0cmxEdW1teScsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICAgJHNjb3BlLmNpbmVtYXMgPSBbe1xuICAgICAgICAgICAgICAgICdpZCc6IDEsXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAnUml0eiBSYW5kd2ljaycsXG4gICAgICAgICAgICAgICAgJ2FkZHJlc3MnOiAnNDUgU3QgUGF1bHMgU3RyZWV0LCBSYW5kd2ljayBOU1cgMjAzMScsXG4gICAgICAgICAgICAgICAgJ2dlbyc6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAnbGF0JzogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGFuZyc6ICcnLFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICdpZCc6IDIsXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAnRGVuZHkgTmV3dG93bicsXG4gICAgICAgICAgICAgICAgJ2FkZHJlc3MnOiAnMjYxLTI2MyBLaW5nIFN0cmVldCwgTmV3dG93biBOU1cgMjA0MicsXG4gICAgICAgICAgICAgICAgJ2dlbyc6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAnbGF0JzogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGFuZyc6ICcnLFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICdpZCc6IDMsXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAnRGVuZHkgT3BlcmEgUXVheScsXG4gICAgICAgICAgICAgICAgJ2FkZHJlc3MnOiAnU2hvcDksIDIgRWFzdCBDaXJjdWxhciBRdWF5LCBTeWRuZXkgTlNXIDIwMDAnLFxuICAgICAgICAgICAgICAgICdnZW8nOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2xhdCc6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xhbmcnOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgIH1dO1xuXHQgICAgfSk7XG59KSgpO1xuIiwiIiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdEYXNoYm9hcmRDdHJsJywgZnVuY3Rpb24oICRzY29wZSApe1xuXG5cdH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0FkZFNlc3Npb25Bc3luY0NvbnRyb2xsZXInLCBmdW5jdGlvbigkdGltZW91dCwgJHNjb3BlKSB7XG4gICAgICAgICAgICAkc2NvcGUubG9hZENpbmVtYXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyBVc2UgdGltZW91dCB0byBzaW11bGF0ZSBhIDY1MG1zIHJlcXVlc3QuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmNpbmVtYXMgPSBbXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jaW5lbWFzID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICdpZCc6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAnbmFtZSc6ICdSaXR6IFJhbmR3aWNrJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdhZGRyZXNzJzogJzQ1IFN0IFBhdWxzIFN0cmVldCwgUmFuZHdpY2sgTlNXIDIwMzEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2dlbyc6IFt7J2xhdCc6ICcnLCAnbGFuZyc6ICcnfV0sXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnaWQnOiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ25hbWUnOiAnRGVuZHkgTmV3dG93bicsXG4gICAgICAgICAgICAgICAgICAgICAgICAnYWRkcmVzcyc6ICcyNjEtMjYzIEtpbmcgU3RyZWV0LCBOZXd0b3duIE5TVyAyMDQyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdnZW8nOiBbeydsYXQnOiAnJywgJ2xhbmcnOiAnJ31dLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogMyxcbiAgICAgICAgICAgICAgICAgICAgICAgICduYW1lJzogJ0RlbmR5IE9wZXJhIFF1YXknLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZHJlc3MnOiAnU2hvcDksIDIgRWFzdCBDaXJjdWxhciBRdWF5LCBTeWRuZXkgTlNXIDIwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2dlbyc6IFt7J2xhdCc6ICcnLCAnbGFuZyc6ICcnfV0sXG4gICAgICAgICAgICAgICAgICAgICAgfV07XG5cbiAgICAgICAgICAgICAgICB9LCA2NTApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLmxvYWRDaW5lbWFzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gVXNlIHRpbWVvdXQgdG8gc2ltdWxhdGUgYSA2NTBtcyByZXF1ZXN0LlxuICAgICAgICAgICAgICAgICRzY29wZS5tb3ZpZXMgPSBbXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qJHNjb3BlLm1vdmllcyA9IFtcblxuICAgICAgICAgICAgICAgICAgICBdOyovXG5cbiAgICAgICAgICAgICAgICB9LCA2NTApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICB9KVxuICAgICAgICAuY29udHJvbGxlcignQWRkQ3RybCcsIFsnJGh0dHAnLCBmdW5jdGlvbigkaHR0cCkge1xuXG4gICAgICAgICAgLy8gU2ltcGxlIFBPU1QgcmVxdWVzdCBleGFtcGxlIChwYXNzaW5nIGRhdGEpIDpcbiAgICAgICAgICAkaHR0cC5wb3N0KCcvc29tZVVybCcsIHttc2c6J2hlbGxvIHdvcmQhJ30pXG4gICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcyBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBhc3luY2hyb25vdXNseVxuICAgICAgICAgICAgICAgIC8vIHdoZW4gdGhlIHJlc3BvbnNlIGlzIGF2YWlsYWJsZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcbiAgICAgICAgICAgICAgICAvLyBjYWxsZWQgYXN5bmNocm9ub3VzbHkgaWYgYW4gZXJyb3Igb2NjdXJzXG4gICAgICAgICAgICAgICAgLy8gb3Igc2VydmVyIHJldHVybnMgcmVzcG9uc2Ugd2l0aCBhbiBlcnJvciBzdGF0dXMuXG4gICAgICAgICAgICAgIH0pO1xuXG5cdCAgIH1dKTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTGFuZGluZ0N0cmwnLCBmdW5jdGlvbiggJHNjb3BlLCAkbWRUb2FzdCwgJG1kRGlhbG9nICl7XG5cblx0XHQvLyAkc2NvcGUubGFuZGluZ0ltYWdlID0gJ2h0dHA6Ly9pLmltZ3VyLmNvbS9YaU15a2tpLnBuZyc7XG5cdFx0JHNjb3BlLmxhbmRpbmdJbWFnZSA9ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvMTU0NDg1NDAwNC9Gb3JfRmFjZWJvb2suSlBHJztcblxuXHRcdCRzY29wZS50b2FzdE5vdGlmaWNhdGlvbiA9IGZ1bmN0aW9uKCl7XG5cdFx0XHQkbWRUb2FzdC5zaG93KFxuXHRcdFx0XHQkbWRUb2FzdC5zaW1wbGUoKVxuXHRcdFx0XHQuY29udGVudCgnVGhpcyBpcyBhIHRvYXN0IG5vdGlmaWNhdGlvbiEnKVxuXHRcdFx0XHQucG9zaXRpb24oJ3RvcCByaWdodCcpXG5cdFx0XHRcdC5oaWRlRGVsYXkoMzAwMClcblx0XHRcdFx0KTtcblx0XHR9O1xuXG5cdFx0JHNjb3BlLnNob3dEaWFsb2cgPSBmdW5jdGlvbiggZXZlbnQgKXtcblx0XHRcdCRtZERpYWxvZy5zaG93KFxuXHRcdFx0XHQkbWREaWFsb2cuYWxlcnQoKVxuXHRcdFx0XHQucGFyZW50KGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSlcblx0XHRcdFx0LnRpdGxlKCdUaGlzIGlzIGFuIGFsZXJ0IHRpdGxlJylcblx0XHRcdFx0LmNvbnRlbnQoJ1lvdSBjYW4gc3BlY2lmeSBzb21lIGRlc2NyaXB0aW9uIHRleHQgaW4gaGVyZS4nKVxuXHRcdFx0XHQuYXJpYUxhYmVsKCdBbGVydCBEaWFsb2cgRGVtbycpXG5cdFx0XHRcdC5vaygnR290IGl0IScpXG5cdFx0XHRcdC50YXJnZXRFdmVudChldmVudClcblx0XHRcdFx0KTtcblx0XHR9O1xuXG5cdH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKVxuICAgICAgICAuY29udHJvbGxlcignTW92aWVzQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICAgJHNjb3BlLm1vdmllcyA9IFtdO1xuXHQgICAgfSlcbiAgICAgICAgLmNvbnRyb2xsZXIoJ01vdmllc0N0cmxTZXJ2aWNlJywgWyckaHR0cCcsIGZ1bmN0aW9uKCRodHRwKSB7XG4gICAgICAgICAgICB2YXIgbW92aWUgPSB0aGlzOyAgIC8vIGNyZWF0ZSBhbiBhbGlhcyBmb3IgdGhpcywgdG8gYmUgdXNlZCBpbnNpZGUgJGh0dHAgZ2V0XG4gICAgICAgICAgICBtb3ZpZS5pdGVtcyA9IFtdOyAgICAvLyBpbml0IHN0b3JlIGRhdGFcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL21vdmllcycpLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIC8vICd0aGlzJyBpbiBoZXJlIHJlZmVyIHRvICRodHRwIHNlcnZpY2Ugb2JqZWN0LCBtdXN0IHVzZSBzdG9yZSBhbGlhc1xuICAgICAgICAgICAgICAgIG1vdmllLml0ZW1zID0gZGF0YTtcbiAgICAgICAgICAgIH0pO1xuXHR9XSk7XG5cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
