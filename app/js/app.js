'use strict';

var noteApp = angular.module('noteApp', [
	'ngRoute',
	'noteAppControllers',
	'noteAppServices'
]);

noteApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/notes', {
			templateUrl: 'partials/list.html',
			controller: 'NoteListCtrl'
		}).
		when('/notes/:id', {
			templateUrl: 'partials/view.html',
			controller: 'NoteCtrl'
		}).
		otherwise({
			redirectTo: '/notes'
		});
	}
]);
