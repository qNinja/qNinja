'use strict';

angular.module('queue').factory('Clipboard', function() {

	// var client = new ZeroClipboard();
 //    client.clip( document.getElementById('clip-button') );
	return {
		alertMe: function() {
			console.log('test');
		}
	};
});