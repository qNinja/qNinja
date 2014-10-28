'use strict';

//Setting up route
angular.module('statistics').config(['$stateProvider',
	function($stateProvider) {
		// Statistics state routing
		$stateProvider.
		state('statistics', {
			url: '/statistics',
			templateUrl: 'modules/statistics/views/statistics.client.view.html'
		});
	}
]);