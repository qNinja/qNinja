'use strict';

angular.module('queue').directive('queueItem', [
	function() {
		return {
			templateURL: '../templates/queue-item.client.template.html',
			restrict: 'AE',
			replace: true,
			link: function postLink(scope, element, attrs) {
				// Queue item directive logic
				// ...

				element.text('this is the queueItem directive');
			}
		};
	}
]);
