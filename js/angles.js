// (c) Raymond Jacobson 2014

var hknApp = angular.module('hknApp', ['ngRoute']);

// routes
hknApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './partials/_home.html',
      controller: 'HomeCtrl'
    })
    .when('/news', {
      templateUrl: './partials/_news.html',
      controller: 'NewsCtrl'
    })
    .when('/about', {
      templateUrl: './partials/_about.html',
      controller: 'AboutCtrl'
    })
    .when('/membership', {
      templateUrl: './partials/_membership.html',
      controller: 'MembershipCtrl'
    })
    .when('/members', {
      templateUrl: './partials/_members.html',
      controller: 'Ctrl'
    })
    .when('/officers', {
      templateUrl: './partials/_officers.html',
      controller: 'Ctrl'
    })
    .when('/projects', {
      templateUrl: './partials/_projects.html',
      controller: 'ProjectsCtrl'
    })
    .when('/events', {
      templateUrl: './partials/_events.html',
      controller: 'EventsCtrl'
    })
    .otherwise({
      templateUrl: './partials/_404.html',
      controller: '404Ctrl'
    });
});


// controllers
hknApp.controller('Ctrl', function($scope) {});//default scope

hknApp.controller('HomeCtrl', function($scope) {
  $scope.page = 'Home';
});
hknApp.controller('NewsCtrl', function($scope, spreadSheet) {
  $scope.page = 'News';
  spreadSheet.getData('https://spreadsheets.google.com/feeds/list/1lmyFNiKIZ92udUNFay0-2Po28eygwBnXWrSP-o6ixdo/od6/public/values?alt=json')
    .then(function(news) {
    $scope.news = news;
  });
});
hknApp.controller('AboutCtrl', function($scope) {
  $scope.page = 'About';
});
hknApp.controller('MembershipCtrl', function($scope) {
  $scope.page = 'Membership';
});
hknApp.controller('ProjectsCtrl', function($scope, spreadSheet) {
  $scope.page = 'Projects';
  spreadSheet.getData('https://spreadsheets.google.com/feeds/list/1v-tItCp0OlzYm3G2qdsP666R0n0RCxx9n9S4MnLPGFI/od6/public/values?alt=json')
    .then(function(projects) {
    $scope.projects = projects;
  });
});
hknApp.controller('EventsCtrl', function($scope, spreadSheet) {
  $scope.page = 'Events';
  spreadSheet.getData('https://spreadsheets.google.com/feeds/list/1masc8Wo299Cs4MRSHdhU9WsvHOFU-C3tOCb_95L8A58/od6/public/values?alt=json')
    .then(function(events) {
    $scope.events = events;
  });
});
hknApp.controller('404Ctrl', function($scope) {
  $scope.page = '404';
});

hknApp.factory('spreadSheet', function($q, $timeout) {
  var getData = function(url) {
    var deferred = $q.defer();

    $.getJSON(url, function(data){ 
      deferred.resolve(data.feed.entry);
    });

    return deferred.promise;
  };

  return {
    getData: getData
  };

});
