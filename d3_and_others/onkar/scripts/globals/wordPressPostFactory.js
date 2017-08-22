(function () {
    'use strict';
    angular.module('test_app').factory("WordPressPostFactory", ['$http', '$q',
          function ($http, $q) {

              var wordPressPostFactory = {};
              wordPressPostFactory.getWordPressPosts = function ( callBack) {
                 var url = 'https://public-api.wordpress.com/rest/v1/sites/idcdistro.wordpress.com/posts';
                  $http.get(url).
                    success(
                      function (data) {
                          console.log(data);
                          callBack(data);
                      }
                  ).
                  error(
                     function () {
                         callBack(null);
                     }
                  )
              }
             
              return wordPressPostFactory;

          } ]);
})();