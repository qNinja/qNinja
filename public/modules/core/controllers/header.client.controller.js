'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);

angular.module('core').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Queue', 'queue', 'item', '/queue');
		Menus.addMenuItem('topbar', 'Mail', 'mail', 'item', '/mail');
		Menus.addMenuItem('topbar', 'Siebelmatic', 'siebelmatic', 'item', '/siebelmatic');
		Menus.addMenuItem('topbar', 'Statistics', 'statistics', 'item', '/statistics');
		Menus.addMenuItem('topbar', 'Pager', 'pager', 'item', '/pager');
		Menus.addMenuItem('topbar', 'Resources', 'resources', 'item', '/resources');
		Menus.addMenuItem('topbar', 'Settings', 'settings', 'item', '/settings');
	}
]);
