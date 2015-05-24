(function(){
	"use strict";

	angular.module('app.controllers').controller('CinemaCtrlService', ['$http', function($http) {
            var cinema = this;   // create an alias for this, to be used inside $http get
            cinema.items = [];    // init store data

            $http.get('/api/cinemas').success(function(data) {
                // 'this' in here refer to $http service object, must use store alias
                cinema.items = data;
            });
	}]);

})();
