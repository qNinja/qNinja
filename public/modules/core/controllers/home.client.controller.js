'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.stylePath = '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css';
		//TODO enable saving this setting.
		//TODO figure out styleName.toLowercase()

		$scope.styles = ['amelia', 'cerulean', 'cosmo', 'cyborg', 'darkly', 'flatly', 'journal', 'lumen', 'readable', 'simplex', 'slate', 'spacelab', 'superhero', 'united', 'yeti'];

		$scope.setStyle = function(styleName) {
			console.log(styleName);
			$scope.stylePath = '//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/' + styleName + '/bootstrap.min.css';
		};
	}

]);
