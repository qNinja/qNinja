'use strict';

// Filters out any Ticket the Agent is not responsible for. Takes an array of PseudoQueues as a parameter.
angular.module('queue').filter('bySubscribedQueues', [function() {
		return function(input, subscribedQueues) {
			var result = [];
			angular.forEach(input, function(Ticket) {
				var isInSubscribedQueues = false;
				for (var queue in subscribedQueues) {
					//console.log('looking for ' + subscribedQueues[queue] + ' in SR: ' + Ticket.SR_NUM);
					if (subscribedQueues[queue] === Ticket.sr_owner) {
						//console.log('testing to see if ' + subscribedQueues[queue] + ' is the same as ' + Ticket.PSEUDOQUEUE_ID + '.');
						isInSubscribedQueues = true;
					}
				}
				if (isInSubscribedQueues) {
					result.push(Ticket);
				}
			});
			return result;
		};
	}
]);