'use strict';

//Setting up route
angular.module('queue').config(['$stateProvider',
	function($stateProvider) {
		// Queue state routing
		$stateProvider.
		state('queue', {
			url: '/queue',
			templateUrl: 'modules/queue/views/queue.client.view.html'
		});
	}
]);