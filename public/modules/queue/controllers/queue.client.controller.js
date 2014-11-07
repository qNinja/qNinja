'use strict';

angular.module('queue').controller('QueueController', ['$scope', '$http', '$interval', '$window',
	function($scope, $http, $interval, $window) {
		$scope.filterSubscribedQueues = true;

		var APIServer = 'http://localhost:3000/';
		$scope.currentUser = 'MBROADHEAD';
		$scope.updateSRs = function() {
			$http.get(APIServer + 'api/v1/SRs')
				.success(function(data, status, headers, config) {
					console.log('Getting SRs for Queue from API');
					$scope.SRs = data;
				})
				.error(function(data, status, headers, config) {
					console.log('Error getting SR list from API.');
				});			
		};

		// Initial population of SR list
		$scope.updateSRs();
		// Check again every x milliseconds.
		$scope.repeat = $interval(function(){ 
			$scope.updateSRs();
 		},'10000');

		// Selects the passed SR object and displays the information in SRInfo
		$scope.selectSR = function(SR) {

			// scroll to top of page
			$window.scroll(0, 0);

			// update SR with more info
			console.log('attempting to update SR');
			$http.get(APIServer + 'api/v1/SRs/' + SR.sr_number)
				.success(function(data, status, headers, config) {
					console.log('Getting SR ' + SR.sr_number);
					
					// append data to that already in sr
					$scope.local = angular.copy(SR);
					angular.extend( $scope.local, data);
					$scope.selectedSR = $scope.local;
				})
				.error(function(data, status, headers, config) {
					console.log('Error getting more information for SR# ' + SR.sr_number + '.');
				});

			$scope.SRvisible = true;
		};

		$scope.assignSR = function(srNumber, owner) {
			var RequestURL = APIServer + 'assignSR.asp?sr=' + srNumber + '&owner=' + owner;
			console.log('Assigning SR# ' + srNumber + ' to ' + owner + '.');
			// $http.patch(RequestURL)
			// 	.success(function(data, status, headers, config) {
			// 		// TODO Success Notification
			// 	return true;
			// 	})
			// 	.error(function(data, status, headers, config) {
			// 		// TODO Error Notification
			// 	return false;
			// 	});
		};

		$scope.subscribedQueues = [
			'GLOBAL_FL_COMM_LINUX',
			'GLOBAL_FL_COMM_NETWARE',
			'GLOBAL_FL_SERVER_OES',
			'GLOBAL_FL_SERVER_OS_LINUX',
			'GLOBAL_FL_SERVER_OS_NETWARE',
			'GLOBAL_FL_SLED'
		];
	}
]);
