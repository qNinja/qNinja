'use strict';

angular.module('queue').factory('AssignSR', [
	function($http, srNumber, owner) {
		// Assignsr service logic
		// TODO move elsewhere
		var APIServer = 'http://localhost:3000/';
		var RequestURL = APIServer + 'assignSR.asp?sr=' + srNumber + '&owner=' + owner;
		alert('test');
		// Public API
		return {
			assign: function($http) {
				$http.patch(RequestURL)
					.success(function(data, status, headers, config) {
					// TODO Success Notification
						return true;
					})
					.error(function(data, status, headers, config) {
					// TODO Error Notification
						return false;
					});
			}
		};
	}
]);
