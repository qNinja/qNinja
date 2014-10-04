'use strict';

angular.module('queue').directive('queueItem', [
	function() {
		return {
			restrict: 'AE',
			replace: true,
			//templateURL: '../templates/queue-item.client.template.html'
			// link: function postLink(scope, element, attrs) {
			// }
			template: '<div class="btn btn-default btn-block" data-ng-click="selectSR(SR)">{{ SR.SR_SEVERITY }} | {{ SR.SUPPORT_HOURS }}<ng-switch on="SR.RESPOND_VIA"> | <span ng-switch-when="Email"><span class="slyphicon glyphicon-envelope"></span></span><span ng-switch-when="Call"><span class="glyphicon glyphicon-earphone"></span></span><span ng-switch-when="Chat"><span class="glyphicon glyphicon-comment"></span</span><span ng-switch-default>None</span></ng-switch><span ng-if="SR.high_value"> <span class="glyphicon glyphicon-flag"></span></span><br />{{ SR.SR_BRIEF_DESC | cut:true:42:" ..." }}</div>'
		};
	}
]);
