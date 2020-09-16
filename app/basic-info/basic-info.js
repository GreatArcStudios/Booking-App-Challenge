'use strict';

angular.module('basicInfo', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/basic-info', {
        templateUrl: 'basic-info/basic-info.html',
        controller: 'basicInfoController'
      });
    }])

    .controller('basicInfoController', ["$scope", "$rootScope", function ($scope, $rootScope) {
      $scope.setCity = function (item) {
        var cityCode = item.currentTarget.getAttribute("city");
        $rootScope.currentCity = $rootScope.cities[cityCode];
      };
      $scope.$watch('firstName', function (newValue, oldValue) {
        $rootScope.name.first = newValue;
      });
      $scope.$watch('lastName', function (newValue, oldValue) {
        $rootScope.name.last = newValue;
      });
    }]);
