/* Word Press module level class app.js */
(function ()
{ 
    'use strict' ;
    var test_app = angular.module('test_app', ['ngRoute','ngStorage','ngCookies' ]);
    
    var loggedInUsers = [];
    test_app.value('loggedIn', loggedInUsers);
    
    
    test_app.config(function ($routeProvider) {
        $routeProvider
            /* for future use - if the post page is part of a multi view SPA
             .when('/newFlow', {
                 controller: 'NewFlowController',
                 templateUrl: 'views/newFlow.html'
             })
             ..
             ...
             */
            .when('/scenic_nature', {
                //   controller: 'WordPressPostController',
                templateUrl: 'views/scenic_nature.html'
            })
            .when('/scenic_nature_carousel', {
                //   controller: 'WordPressPostController',
                templateUrl: 'views/scenic_nature_carousel.html'
            })
            .when('/css_basic', {
                //   controller: 'WordPressPostController',
                templateUrl: 'views/css_basic.html'
            })
            .otherwise({ redirectTo: '/scenic_nature_carousel' });
            }), 
            function ($httpProvider) {
                $httpProvider.defaults.headers.common = {};
                $httpProvider.defaults.headers.post = {};
                $httpProvider.defaults.headers.put = {};
            };
})();
 