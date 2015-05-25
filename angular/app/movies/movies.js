(function(){
	"use strict";

	angular.module('app.controllers')
        .controller('MoviesCtrl', function($scope) {
            $scope.movies = [];
	    })
        .controller('MoviesCtrlService', ['$http', function($http) {
            var movie = this;   // create an alias for this, to be used inside $http get
            movie.items = [];    // init store data

            $http.get('/api/movies').success(function(data) {
                // 'this' in here refer to $http service object, must use store alias
                movie.items = data;
            });
	}]);

})();
