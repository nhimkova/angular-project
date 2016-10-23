angular.module('CryptoStats').controller('WidgetStatsController', ['$http', '$scope', function($http, $scope){
  $http({method: 'GET', url: 'https://widgets.cryptocompare.com/stats'}).success(function(data){
    var rawstats = data.Stats.V1_Chart;
    
    //Get data into array
    var stats = [];
    for (key in rawstats) {
      var statitem = rawstats[key].Calls;
      statitem.id = key;
      statitem.hourChange = statitem.hourTotal - statitem.prevHourTotal;
      statitem.minChange = statitem.minuteTotal - statitem.prevMinuteTotal;
      statitem.secondChange = statitem.secondTotal - statitem.prevSecondTotal;
      stats.push(statitem);
    }
    $scope.wstats = stats;

    //Max
    var hourstats = Object.keys(stats).map(function (key) { return stats[key].hourTotal; });
    $scope.wmax_hour = Math.max.apply( null, hourstats );
    var minutestats = Object.keys(stats).map(function (key) { return stats[key].minuteTotal; });
    $scope.wmax_minute = Math.max.apply( null, minutestats );
    var secondstats = Object.keys(stats).map(function (key) { return stats[key].secondTotal; });
    $scope.wmax_second = Math.max.apply( null, secondstats );

    //Totals
    var sum_hour = 0;
    var sum_minute = 0;
    var sum_second = 0;
    for (var i=0; i<stats.length; i++) {
      sum_hour += stats[i].hourTotal;
      sum_minute += stats[i].minuteTotal;
      sum_second += stats[i].secondTotal;
    }
    $scope.wtotal_hour = sum_hour;
    $scope.wtotal_minute = sum_minute;
    $scope.wtotal_second = sum_second;

  });
}]);

