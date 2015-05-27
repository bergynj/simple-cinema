(function(){
	"use strict";

	angular.module('app.controllers')
        .controller('AddSessionAsyncController', function($timeout, $scope) {
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

        })
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
