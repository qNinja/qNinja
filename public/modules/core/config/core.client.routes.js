'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/queue');

		// Home state routing
		$stateProvider.
		state('siebelmatic', {
			url: '/siebelmatic',
			templateUrl: 'modules/core/views/siebelmatic.client.view.html'
		}).
		state('resources', {
			url: '/resources',
			templateUrl: 'modules/core/views/resources.client.view.html'
		}).
		state('pager', {
			url: '/pager',
			templateUrl: 'modules/core/views/pager.client.view.html'
		}).
		state('about', {
			url: '/about',
			templateUrl: 'modules/core/views/about.client.view.html'
		});
	}
]);