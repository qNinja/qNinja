'use strict';

angular.module('queue').controller('QueueController', ['$scope', '$http',
	function($scope, $http) {
		$scope.SRvisible = false;
		//$http.get('http://localhost:8080/api/v1/SRs').
		//$http.get('http://mbroadhead.lab.novell.com/api/v1/SRs').
		$http.get('http://localhost:3000/api/v1/bigqueue').
			success(function(data, status, headers, config) {
				console.log('Getting SRs for Queue from API');
				$scope.SRs = data;
			}).
			error(function(data, status, headers, config) {
				console.log('Can\'t access API');
			});

		$scope.selectedSR = {};

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
