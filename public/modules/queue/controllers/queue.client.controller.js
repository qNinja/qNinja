'use strict';

angular.module('queue').controller('QueueController', ['$scope', '$http',
	function($scope, $http) {
		// pretty sure these are unneeded
		//$scope.SRvisible = false;
		//$scope.selectedSR = {};

		$http.get('http://localhost:3000/api/v1/SRs')
			.success(function(data, status, headers, config) {
				console.log('Getting SRs for Queue from API');
				$scope.SRs = data;
			})
			.error(function(data, status, headers, config) {
				console.log('Can\'t access API');
			});

		$scope.selectSR = function(SR) {
			$scope.selectedSR = SR;
			$scope.SRvisible = true;

			// update SR with more info
			console.log('attempting to update SR');
			$http.get('http://localhost:3000/api/v1/SRs/' + SR.sr_number)
				.success(function(data, status, headers, config) {
					console.log('Getting SR ' + SR.sr_number);
					$scope.SR = data;
				})
				.error(function(data, status, headers, config) {
					console.log('Can\'t access API');
				});
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
