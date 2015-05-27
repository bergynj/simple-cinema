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
        .controller('CinemaCtrlDummy', function($scope) {
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
	    });
})();
