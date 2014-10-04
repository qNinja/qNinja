'use strict';

//Setting up route
angular.module('mail').config(['$stateProvider',
	function($stateProvider) {
		// Mail state routing
		$stateProvider.
		state('mail', {
			url: '/mail',
			templateUrl: 'modules/mail/views/mail.client.view.html'
		});
	}
]);