'use strict';

angular.module('queue').controller('QueueController', ['$scope', '$http',
	function($scope, $http) {
		$scope.SRvisible = false;
		$scope.selectedSR = {};

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
