'use strict';

angular.module('statistics').controller('StatisticsController', ['$scope',
	function($scope) {
		$scope.users = [
		{
			'x' : 'ben',
			'y' : [50, 60]
		},
		{
			'x' : 'peter',
			'y' : [47, 78]
		},
		{
			'x' : 'mark',
			'y' : [32, 65]
		}
		];

		$scope.config = {
			title: 'Team Statistics',
			tooltips: true,
			labels: false,
			//mouseover: function() {},
			//mouseout: function() {},
			//click: function() {},
			legend: {
				display: true,
				//could be 'left, right'
				position: 'right'
			}
		};

		$scope.data = {
			series: ['open', 'closed'],
			data: $scope.users
		};
	}
]);
