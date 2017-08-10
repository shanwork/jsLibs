var test_stats_app = angular.module('test_stats_app', ['nvd3','ngRoute','ngStorage']);
test_stats_app.config(function($routeProvider){
    $routeProvider
     .when ('/default',
         {
            // controller: 'errorDataController',
             templateUrl:'testCrud.html'
         }
      )
      .when ('/about',
         {
              templateUrl:'views/about.html'
         }
      )
      .when ('/stats',
         {
             controller: 'RangeStatisticsController',
             templateUrl:'views/rangeStatistics.html'
         }
      )
      .when ('/entry',
         {
             controller: 'DataEntryController',
             templateUrl:'views/dataEntry.html'
         }
      )
      .when ('/generalHealthStats',
         {
             controller: 'HealthStatsController',
             templateUrl:'views/healthStats.html'
         }
      )
      .otherwise( {redirectTo : '/entry'});
})
