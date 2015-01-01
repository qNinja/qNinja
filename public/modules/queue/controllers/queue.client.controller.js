'use strict';

angular.module('queue').controller('QueueController', ['$scope', '$http', '$interval', '$window', '$location', 'Authentication', 'toaster',
	function($scope, $http, $interval, $window, $location, Authentication, toaster) {
		$scope.authentication = Authentication;
		$scope.filterSubscribedQueues = true;

		var nodeServer = 'http://' + $location.host() + ':' + $location.port() + '/';
		$scope.updateSRs = function() {
			$http.get(nodeServer + 'api/v1/SRs')
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


		// hides the SRinfo window
		$scope.deselectSR = function() {
			$window.scroll(0, 0);
			$scope.selectedSR = undefined;
			$scope.SRvisible = false;
		};


		// Selects the passed SR object and displays the information in SRInfo
		$scope.selectSR = function(SR) {

			// scroll to top of page
			$window.scroll(0, 0);

			// update SR with more info
			console.log('attempting to update SR ' + SR.sr_number);
			$http.get(nodeServer + 'api/v1/SRs/' + SR.sr_number)
				.success(function(data, status, headers, config) {
					console.log('Receiving data for SR ' + SR.sr_number);
					
					// append data to that already in sr
					// console.log('SR:');
					// console.log(SR);

					$scope.local = angular.copy(SR);
					// console.log('local:');
					// console.log($scope.local);
					// console.log('data:');
					// console.log(data);

					// data taken from seibel overwrites data from wallboard.
					angular.extend($scope.local, data);
					$scope.selectedSR = $scope.local;
					// console.log('selectedSR:');
					// console.log($scope.selectedSR);
				})
				.error(function(data, status, headers, config) {
					console.log('Error getting more information for SR# ' + SR.sr_number + '.');
					toaster.pop('error', 'ERROR', 'Error getting more information for SR# ' + SR.sr_number + '.');
				});

			$scope.SRvisible = true;
		};

		// calls the API to assign SR srNumber to owner
		$scope.assignSR = function(srNumber, owner) {
			if($scope.authentication.user) {
				var RequestURL = nodeServer + 'api/v1/SRs/' + srNumber + '/?owner=' + owner;
				console.log('Assigning SR# ' + srNumber + ' to ' + owner + '.');
				$http.put(RequestURL)
				.success(function(data, status, headers, config) {
					toaster.pop('success', 'Success!', 'SR ' + srNumber + ' assigned to ' + owner);
					return true;
				})
				.error(function(data, status, headers, config) {
					toaster.pop('error', 'ERROR', 'Error assigning SR ' + srNumber + ' to ' + owner);
					//$window.alert('Error assigning SR ' + srNumber + ' to ' + owner + '\n' + data.error);
					return false;
				});
			}
			else{
				toaster.pop('error', 'Not Authorized', 'You must be logged in to assign a Service Request.');
			}
		};

		$scope.subscribedQueues = [
			'GLOBAL_FL_COMM_LINUX',
			'GLOBAL_FL_COMM_NETWARE',
			'GLOBAL_FL_SERVER_OES',
			'GLOBAL_FL_SERVER_OS_LINUX',
			'GLOBAL_FL_SERVER_OS_NETWARE',
			'GLOBAL_FL_SLED'
		];

		$scope.teamMembers = [
			{name: 'Anders Bray', username: 'ABRAY'},
			{name: 'Sean Barlow', username: 'SBARLOW'},
			{name: 'Roger Williams', username: 'RWILLIAMS'},
			{name: 'Ben Matheson', username: 'BMATHESON'},
			{name: 'Logan Vance', username: 'LOVANCE'},
			{name: 'Donaji Lugo', username: 'DOLUGO'},
			{name: 'Jackie Lam', username: 'JLAM'},
			{name: 'Mark Broadhead', username: 'MBROADHEAD'},
			{name: 'Stephan Riley', username: 'SRILEY'},
			{name: 'Richard Hamilton', username: 'RHAMILTON'}
		];

		$scope.commonQueues = [
			'another queue'
		];

	}
]);
