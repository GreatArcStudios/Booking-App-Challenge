'use strict';

// Declare app level module which depends on views, and core components
var app = angular.module('bookingApp', [
	'ngRoute',
	'basicInfo',
	'bookPage',
	'moment-picker',
	'ngMap',
	'ngAnimate'
]).config(['$locationProvider', '$routeProvider', 'momentPickerProvider', function ($locationProvider, $routeProvider, momentPickerProvider) {
	$locationProvider.hashPrefix('!');

	$routeProvider.otherwise({redirectTo: '/basic-info'});

	momentPickerProvider.options({
		/* Picker properties */
		format: 'L LTS',
		minView: 'month',
		maxView: 'minute',
		startView: 'month',
		autoclose: true,
		today: true,
		keyboard: false,
	});
}]);

app.run(function ($rootScope) {
	//the root scope will store all data needed in between views.
	$rootScope.reservationDate = new Date();
	$rootScope.hoursNeeded = 0.0;
	// could be replaced by some type of person object
	$rootScope.name = {first: "", last: ""};
	//store costs as floating point numbers because price of moving may be determined by market costs
	$rootScope.totalCost = 0.0;
	$rootScope.cost = {weekend: 150, weekday: 100};
	// the background image (bgImage) could be replaced by a more robust and dynamic system.
	$rootScope.cities = {
		to:
			{
				fullName: "Toronto",
				bgImage: "https://free4kwallpapers.com/uploads/originals/2020/08/19/toronto-wallpaper.jpg"
			},
		mtl:
			{
				fullName: "Montréal",
				bgImage: "https://www.nationalgeographic.com/content/dam/travel/2017-digital/canada/montreal-article/moins-sombre.adapt.1900.1.jpg"
			},
		van:
			{
				fullName: "Vancouver",
				bgImage: "https://free4kwallpapers.com/uploads/originals/2020/02/16/vancouver-bc-wallpaper.jpg"
			}
	};
	// keep a variable for the default city in case
	$rootScope.defaultCity = $rootScope.cities.to;
	$rootScope.bgImage = $rootScope.defaultCity.bgImage;
	$rootScope.currentCity = $rootScope.defaultCity;
});

app.controller("appController", function ($scope) {
	$scope.$watch("currentCity", function (newValue, oldValue) {
		if (newValue !== oldValue) {
			$scope.bgImage = $scope.currentCity.bgImage;
		}
	});
});