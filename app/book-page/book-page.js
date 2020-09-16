'use strict';

angular.module('bookPage', ['ngRoute', 'ngAnimate', 'ngMap'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/book-page', {
			templateUrl: 'book-page/book-page.html',
			controller: 'bookPageController'
		});
	}])

	.controller('bookPageController', ["$scope", "$rootScope", "NgMap", function ($scope, $rootScope, NgMap) {
		$scope.mapStyle = [
			{
				"featureType": "all",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"weight": "2.00"
					}
				]
			},
			{
				"featureType": "all",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#9c9c9c"
					}
				]
			},
			{
				"featureType": "all",
				"elementType": "labels.text",
				"stylers": [
					{
						"visibility": "on"
					}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "all",
				"stylers": [
					{
						"color": "#f2f2f2"
					}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#ffffff"
					}
				]
			},
			{
				"featureType": "landscape.man_made",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"visibility": "on",
						"color": "#ffffff"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "all",
				"stylers": [
					{
						"saturation": -100
					},
					{
						"lightness": 45
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#eeeeee"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#7b7b7b"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#ffffff"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "simplified"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "all",
				"stylers": [
					{
						"color": "#46bcec"
					},
					{
						"visibility": "on"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#c8d7d4"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#070707"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#ffffff"
					}
				]
			}
		];
		$scope.clientLocation = $rootScope.currentCity.fullName;
		$scope.mapBounds = {center: $rootScope.currentCity.fullName, radius: 50};
		//var needed in only this view. Not needed in rest of app.
		$scope.hourlyCost = 0;
		$scope.$watch("ctrl.timepicker", function (newValue, oldValue) {
			if (newValue !== oldValue) {
				// split into hour minute list
				var timeList = newValue.split(":");
				$rootScope.reservationDate.setHours(timeList[0], timeList[1], 0);
			}
		});
		$scope.$watch("ctrl.datepicker", function (newValue, oldValue) {
			if (newValue !== oldValue) {
				// split selected date into year month day (YYYY-MM-DD) format
				var dateList = newValue.split("-");
				$rootScope.reservationDate.setFullYear(dateList[0], dateList[1], dateList[2]);
				if ($scope.serviceHours) {
					calculateTotalCost($rootScope, $scope);
				}
			}
		});
		$scope.$watch("serviceHours", function (newValue, oldValue) {
			if (newValue) {
				$rootScope.hoursNeeded = newValue;
				calculateTotalCost($rootScope, $scope);
			}
		});
		$scope.placeChanged = function () {
			$scope.place = this.getPlace();
			$scope.map.setCenter($scope.place.geometry.location);
			$scope.mapBounds = {center: $scope.place.geometry.location, radius: 50};
		};
		NgMap.getMap().then(function (map) {
			$scope.map = map;
		});

	}]);

function calculateTotalCost($rootScope, $scope) {
	var pickupDay = $rootScope.reservationDate.getDay();
	if (pickupDay == 1 || pickupDay == 2) {
		$rootScope.totalCost = $scope.serviceHours * $rootScope.cost.weekend;
		$scope.hourlyCost = $rootScope.cost.weekend;
	} else {
		$rootScope.totalCost = $scope.serviceHours * $rootScope.cost.weekday;
		$scope.hourlyCost = $rootScope.cost.weekday;
	}
}