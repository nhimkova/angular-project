angular.module('CryptoStats').directive('cryptoDonut', function($window){
	return {
		restrict: 'E',
		scope: {
			data: '@'
		},
		link: function(scope, element, attrs){
			var data = attrs.data;
			var d3 = $window.d3;
			var svg = d3.select(element[0])
				.append('svg')
				.attr('width', 100)
				.attr('height', 100);

			console.log(data);

			var rect = svg.selectAll('rect')
				.data(data)
				.enter()
				.append('rect')
				.attr('x', 50)
				.attr('y', 0)
				.attr('width', 30)
				.attr('height', 100)
				.attr('fill', 'yellow');
		}
	};
});