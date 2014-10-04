'use strict';

angular.module('queue').directive('queueItem', [
	function() {
		return {
			restrict: 'AE',
			replace: true,
			templateUrl: 'modules/queue/templates/queue-item.client.template.html'
			// link: function postLink(scope, element, attrs) {
			// }
		};
	}
]);
