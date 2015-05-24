(function(){
	"use strict";

	angular.module('app.controllers').controller('LandingCtrl', function( $scope, $mdToast, $mdDialog ){

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

	});

})();
