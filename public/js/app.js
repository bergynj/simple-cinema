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


	}] );
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

	angular.module('app.controllers')
        .controller('AdminAsyncController', ["$timeout", "$scope", function($timeout, $scope) {
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
        .controller('AdminCtrl', ['$http', function($http) {

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

	angular.module('app.controllers')
        .controller('CinemaCtrl', ["$scope", function($scope) {
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
	    }])
        .controller('CinemaCtrlService', ['$http', function($http) {
            var cinema = this;   // create an alias for this, to be used inside $http get
            cinema.items = [];    // init store data

            $http.get('/api/cinemas').success(function(data) {
                // 'this' in here refer to $http service object, must use store alias
                cinema.items = data;
            });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tYWluLmpzIiwiYXBwL3JvdXRlcy5qcyIsImNvbmZpZy9yZXN0YW5ndWxhci5qcyIsImNvbmZpZy90aGVtZS5qcyIsImZpbHRlcnMvY2FwaXRhbGl6ZS5qcyIsImZpbHRlcnMvdHJhbnNsYXRpb25zLmpzIiwiZmlsdGVycy90cnVzdF9odG1sLmpzIiwiZmlsdGVycy91Y2ZpcnN0LmpzIiwiYXBwL2FkbWluL2FkbWluLmpzIiwiYXBwL2NpbmVtYXMvY2luZW1hcy5qcyIsImFwcC9mb290ZXIvZm9vdGVyLmpzIiwiYXBwL2Rhc2hib2FyZC9kYXNoYm9hcmQuanMiLCJhcHAvbGFuZGluZy9sYW5kaW5nLmpzIiwiYXBwL21vdmllcy9tb3ZpZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1Q0E7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHR2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsXG5cdFx0W1xuXHRcdCdhcHAuY29udHJvbGxlcnMnLFxuXHRcdCdhcHAuZmlsdGVycycsXG5cdFx0J2FwcC5zZXJ2aWNlcycsXG5cdFx0J2FwcC5kaXJlY3RpdmVzJyxcblx0XHQnYXBwLnJvdXRlcycsXG5cdFx0J2FwcC5jb25maWcnLFxuXHRcdF0pO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVzJywgWyd1aS5yb3V0ZXInLCAnbmdTdG9yYWdlJ10pO1xuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJywgWyd1aS5yb3V0ZXInLCAnbmdNYXRlcmlhbCcsICduZ1N0b3JhZ2UnLCAncmVzdGFuZ3VsYXInXSk7XG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycsIFtdKTtcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5zZXJ2aWNlcycsIFsndWkucm91dGVyJywgJ25nU3RvcmFnZScsICdyZXN0YW5ndWxhciddKTtcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJywgW10pO1xuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycsIFtdKTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnKS5jb25maWcoIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIgKSB7XG5cblx0XHR2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uKCB2aWV3TmFtZSApe1xuXHRcdFx0cmV0dXJuICcvdmlld3MvYXBwLycgKyB2aWV3TmFtZSArICcvJyArIHZpZXdOYW1lICsgJy5odG1sJztcblx0XHR9O1xuXG5cdFx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG5cdFx0JHN0YXRlUHJvdmlkZXJcblx0XHQuc3RhdGUoJ2xhbmRpbmcnLCB7XG5cdFx0XHR1cmw6ICcvJyxcblx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdG1haW46IHtcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygnbGFuZGluZycpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KS5zdGF0ZSgnY2luZW1hcycsIHtcblx0XHRcdHVybDogJy9jaW5lbWFzJyxcblx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdG1haW46IHtcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygnY2luZW1hcycpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZvb3Rlcjoge1xuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdmb290ZXInKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSkuc3RhdGUoJ2Rhc2hib2FyZCcsIHtcblx0XHRcdHVybDogJy9kYXNoYm9hcmQnLFxuXHRcdFx0dmlld3M6IHtcblx0XHRcdFx0bWFpbjoge1xuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdkYXNoYm9hcmQnKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRmb290ZXI6IHtcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pLnN0YXRlKCdhZG1pbicsIHtcblx0XHRcdHVybDogJy9hZG1pbicsXG5cdFx0XHR2aWV3czoge1xuXHRcdFx0XHRtYWluOiB7XG5cdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ2FkbWluJylcblx0XHRcdFx0fSxcblx0XHRcdFx0Zm9vdGVyOiB7XG5cdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Zvb3RlcicpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblxuXG5cdH0gKTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnKS5jb25maWcoIGZ1bmN0aW9uKFJlc3Rhbmd1bGFyUHJvdmlkZXIpIHtcblx0XHRSZXN0YW5ndWxhclByb3ZpZGVyXG5cdFx0LnNldEJhc2VVcmwoJy9hcGkvMS8nKVxuXHRcdC5zZXREZWZhdWx0SGVhZGVycyh7J1gtQ1NSRi1UT0tFTic6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjc3JmLXRva2VuJykudmFsdWUgfSk7XG5cdH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycpLmNvbmZpZyggZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XG5cdFx0LyogRm9yIG1vcmUgaW5mbywgdmlzaXQgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyanMub3JnLyMvVGhlbWluZy8wMV9pbnRyb2R1Y3Rpb24gKi9cblx0XHQkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKVxuXHRcdC5wcmltYXJ5UGFsZXR0ZSgndGVhbCcpXG5cdFx0LmFjY2VudFBhbGV0dGUoJ2N5YW4nKVxuXHRcdC53YXJuUGFsZXR0ZSgncmVkJyk7XG5cdH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoICdjYXBpdGFsaXplJywgZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gZnVuY3Rpb24oaW5wdXQsIGFsbCkge1xuXHRcdFx0cmV0dXJuICghIWlucHV0KSA/IGlucHV0LnJlcGxhY2UoLyhbXlxcV19dK1teXFxzLV0qKSAqL2csZnVuY3Rpb24odHh0KXtcblx0XHRcdFx0cmV0dXJuIHR4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHR4dC5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTtcblx0XHRcdH0pIDogJyc7XG5cdFx0fTtcblx0fSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoICd0JywgZnVuY3Rpb24oICRmaWx0ZXIgKXtcblx0XHRyZXR1cm4gZnVuY3Rpb24oIHRleHQgKXtcblx0XHRcdHRleHQgPSAkZmlsdGVyKCd0cmFuc2xhdGUnKSh0ZXh0KTtcblx0XHRcdHJldHVybiAkZmlsdGVyKCd1Y2ZpcnN0JykodGV4dCk7XG5cdFx0fTtcblx0fSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoICd0cnVzdEh0bWwnLCBmdW5jdGlvbiggJHNjZSApe1xuXHRcdHJldHVybiBmdW5jdGlvbiggaHRtbCApe1xuXHRcdFx0cmV0dXJuICRzY2UudHJ1c3RBc0h0bWwoaHRtbCk7XG5cdFx0fTtcblx0fSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoJ3VjZmlyc3QnLCBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oIGlucHV0ICkge1xuXHRcdFx0aWYgKCAhaW5wdXQgKXtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gaW5wdXQuc3Vic3RyaW5nKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBpbnB1dC5zdWJzdHJpbmcoMSk7XG5cdFx0fTtcblx0fSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpXG4gICAgICAgIC5jb250cm9sbGVyKCdBZG1pbkFzeW5jQ29udHJvbGxlcicsIGZ1bmN0aW9uKCR0aW1lb3V0LCAkc2NvcGUpIHtcbiAgICAgICAgICAgICRzY29wZS5sb2FkQ2luZW1hcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIFVzZSB0aW1lb3V0IHRvIHNpbXVsYXRlIGEgNjUwbXMgcmVxdWVzdC5cbiAgICAgICAgICAgICAgICAkc2NvcGUuY2luZW1hcyA9IFtdO1xuICAgICAgICAgICAgICAgIHJldHVybiAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmNpbmVtYXMgPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICduYW1lJzogJ1JpdHogUmFuZHdpY2snLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZHJlc3MnOiAnNDUgU3QgUGF1bHMgU3RyZWV0LCBSYW5kd2ljayBOU1cgMjAzMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZ2VvJzogW3snbGF0JzogJycsICdsYW5nJzogJyd9XSxcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdpZCc6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAnbmFtZSc6ICdEZW5keSBOZXd0b3duJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdhZGRyZXNzJzogJzI2MS0yNjMgS2luZyBTdHJlZXQsIE5ld3Rvd24gTlNXIDIwNDInLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2dlbyc6IFt7J2xhdCc6ICcnLCAnbGFuZyc6ICcnfV0sXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnaWQnOiAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ25hbWUnOiAnRGVuZHkgT3BlcmEgUXVheScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnYWRkcmVzcyc6ICdTaG9wOSwgMiBFYXN0IENpcmN1bGFyIFF1YXksIFN5ZG5leSBOU1cgMjAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZ2VvJzogW3snbGF0JzogJycsICdsYW5nJzogJyd9XSxcbiAgICAgICAgICAgICAgICAgICAgICB9XTtcblxuICAgICAgICAgICAgICAgIH0sIDY1MCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUubG9hZENpbmVtYXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyBVc2UgdGltZW91dCB0byBzaW11bGF0ZSBhIDY1MG1zIHJlcXVlc3QuXG4gICAgICAgICAgICAgICAgJHNjb3BlLm1vdmllcyA9IFtdO1xuICAgICAgICAgICAgICAgIHJldHVybiAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgLyokc2NvcGUubW92aWVzID0gW1xuXG4gICAgICAgICAgICAgICAgICAgIF07Ki9cblxuICAgICAgICAgICAgICAgIH0sIDY1MCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH0pXG4gICAgICAgIC5jb250cm9sbGVyKCdBZG1pbkN0cmwnLCBbJyRodHRwJywgZnVuY3Rpb24oJGh0dHApIHtcblxuICAgICAgICAgIC8vIFNpbXBsZSBQT1NUIHJlcXVlc3QgZXhhbXBsZSAocGFzc2luZyBkYXRhKSA6XG4gICAgICAgICAgJGh0dHAucG9zdCgnL3NvbWVVcmwnLCB7bXNnOidoZWxsbyB3b3JkISd9KVxuICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgYXN5bmNocm9ub3VzbHlcbiAgICAgICAgICAgICAgICAvLyB3aGVuIHRoZSByZXNwb25zZSBpcyBhdmFpbGFibGVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgLy8gY2FsbGVkIGFzeW5jaHJvbm91c2x5IGlmIGFuIGVycm9yIG9jY3Vyc1xuICAgICAgICAgICAgICAgIC8vIG9yIHNlcnZlciByZXR1cm5zIHJlc3BvbnNlIHdpdGggYW4gZXJyb3Igc3RhdHVzLlxuICAgICAgICAgICAgICB9KTtcblxuXHQgICB9XSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpXG4gICAgICAgIC5jb250cm9sbGVyKCdDaW5lbWFDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgICAkc2NvcGUuY2luZW1hcyA9IFt7XG4gICAgICAgICAgICAgICAgJ2lkJzogMSxcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICdSaXR6IFJhbmR3aWNrJyxcbiAgICAgICAgICAgICAgICAnYWRkcmVzcyc6ICc0NSBTdCBQYXVscyBTdHJlZXQsIFJhbmR3aWNrIE5TVyAyMDMxJyxcbiAgICAgICAgICAgICAgICAnZ2VvJzogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICdsYXQnOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdsYW5nJzogJycsXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJ2lkJzogMixcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICdEZW5keSBOZXd0b3duJyxcbiAgICAgICAgICAgICAgICAnYWRkcmVzcyc6ICcyNjEtMjYzIEtpbmcgU3RyZWV0LCBOZXd0b3duIE5TVyAyMDQyJyxcbiAgICAgICAgICAgICAgICAnZ2VvJzogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICdsYXQnOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdsYW5nJzogJycsXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJ2lkJzogMyxcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICdEZW5keSBPcGVyYSBRdWF5JyxcbiAgICAgICAgICAgICAgICAnYWRkcmVzcyc6ICdTaG9wOSwgMiBFYXN0IENpcmN1bGFyIFF1YXksIFN5ZG5leSBOU1cgMjAwMCcsXG4gICAgICAgICAgICAgICAgJ2dlbyc6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAnbGF0JzogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGFuZyc6ICcnLFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgfV07XG5cdCAgICB9KVxuICAgICAgICAuY29udHJvbGxlcignQ2luZW1hQ3RybFNlcnZpY2UnLCBbJyRodHRwJywgZnVuY3Rpb24oJGh0dHApIHtcbiAgICAgICAgICAgIHZhciBjaW5lbWEgPSB0aGlzOyAgIC8vIGNyZWF0ZSBhbiBhbGlhcyBmb3IgdGhpcywgdG8gYmUgdXNlZCBpbnNpZGUgJGh0dHAgZ2V0XG4gICAgICAgICAgICBjaW5lbWEuaXRlbXMgPSBbXTsgICAgLy8gaW5pdCBzdG9yZSBkYXRhXG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9jaW5lbWFzJykuc3VjY2VzcyhmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgLy8gJ3RoaXMnIGluIGhlcmUgcmVmZXIgdG8gJGh0dHAgc2VydmljZSBvYmplY3QsIG11c3QgdXNlIHN0b3JlIGFsaWFzXG4gICAgICAgICAgICAgICAgY2luZW1hLml0ZW1zID0gZGF0YTtcbiAgICAgICAgICAgIH0pO1xuXHR9XSk7XG5cbn0pKCk7XG4iLCIiLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZEN0cmwnLCBmdW5jdGlvbiggJHNjb3BlICl7XG5cblx0fSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdMYW5kaW5nQ3RybCcsIGZ1bmN0aW9uKCAkc2NvcGUsICRtZFRvYXN0LCAkbWREaWFsb2cgKXtcblxuXHRcdC8vICRzY29wZS5sYW5kaW5nSW1hZ2UgPSAnaHR0cDovL2kuaW1ndXIuY29tL1hpTXlra2kucG5nJztcblx0XHQkc2NvcGUubGFuZGluZ0ltYWdlID0gJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy8xNTQ0ODU0MDA0L0Zvcl9GYWNlYm9vay5KUEcnO1xuXG5cdFx0JHNjb3BlLnRvYXN0Tm90aWZpY2F0aW9uID0gZnVuY3Rpb24oKXtcblx0XHRcdCRtZFRvYXN0LnNob3coXG5cdFx0XHRcdCRtZFRvYXN0LnNpbXBsZSgpXG5cdFx0XHRcdC5jb250ZW50KCdUaGlzIGlzIGEgdG9hc3Qgbm90aWZpY2F0aW9uIScpXG5cdFx0XHRcdC5wb3NpdGlvbigndG9wIHJpZ2h0Jylcblx0XHRcdFx0LmhpZGVEZWxheSgzMDAwKVxuXHRcdFx0XHQpO1xuXHRcdH07XG5cblx0XHQkc2NvcGUuc2hvd0RpYWxvZyA9IGZ1bmN0aW9uKCBldmVudCApe1xuXHRcdFx0JG1kRGlhbG9nLnNob3coXG5cdFx0XHRcdCRtZERpYWxvZy5hbGVydCgpXG5cdFx0XHRcdC5wYXJlbnQoYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpKVxuXHRcdFx0XHQudGl0bGUoJ1RoaXMgaXMgYW4gYWxlcnQgdGl0bGUnKVxuXHRcdFx0XHQuY29udGVudCgnWW91IGNhbiBzcGVjaWZ5IHNvbWUgZGVzY3JpcHRpb24gdGV4dCBpbiBoZXJlLicpXG5cdFx0XHRcdC5hcmlhTGFiZWwoJ0FsZXJ0IERpYWxvZyBEZW1vJylcblx0XHRcdFx0Lm9rKCdHb3QgaXQhJylcblx0XHRcdFx0LnRhcmdldEV2ZW50KGV2ZW50KVxuXHRcdFx0XHQpO1xuXHRcdH07XG5cblx0fSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpXG4gICAgICAgIC5jb250cm9sbGVyKCdNb3ZpZXNDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgICAkc2NvcGUubW92aWVzID0gW107XG5cdCAgICB9KVxuICAgICAgICAuY29udHJvbGxlcignTW92aWVzQ3RybFNlcnZpY2UnLCBbJyRodHRwJywgZnVuY3Rpb24oJGh0dHApIHtcbiAgICAgICAgICAgIHZhciBtb3ZpZSA9IHRoaXM7ICAgLy8gY3JlYXRlIGFuIGFsaWFzIGZvciB0aGlzLCB0byBiZSB1c2VkIGluc2lkZSAkaHR0cCBnZXRcbiAgICAgICAgICAgIG1vdmllLml0ZW1zID0gW107ICAgIC8vIGluaXQgc3RvcmUgZGF0YVxuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvbW92aWVzJykuc3VjY2VzcyhmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgLy8gJ3RoaXMnIGluIGhlcmUgcmVmZXIgdG8gJGh0dHAgc2VydmljZSBvYmplY3QsIG11c3QgdXNlIHN0b3JlIGFsaWFzXG4gICAgICAgICAgICAgICAgbW92aWUuaXRlbXMgPSBkYXRhO1xuICAgICAgICAgICAgfSk7XG5cdH1dKTtcblxufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
