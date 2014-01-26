'use strict';

/* Controllers */

var noteControllers = angular.module('noteAppControllers',[]);

noteControllers.controller('NoteListCtrl', ['$scope', 'noteStorageService',
	function($scope, noteStorageService) {

		// initialize functions
		$scope.getTitle = function(noteId) { return noteStorageService.getNoteTitle(noteId); };
		$scope.getDate = function(noteId) { return noteStorageService.getNoteDate(noteId); };
		// initialize note count for looping
		$scope.noteCount = noteStorageService.getNoteCount();

		//filter function to check if note exists
		$scope.checkNote = function(i) {
			if ($scope.getTitle(i) == null) {
				return false;
			} else {
				return true;
			}
		};

		// returns an array with range from 0 to num-1
		$scope.range = function(num) {
			if (num > 0) {
				var rangeArray = Array(num);
				for (var i = 0; i < num; i++) {
					rangeArray[i] = i;
				}
				return rangeArray;
			}
		};

		$scope.deleteNote = function(noteId) {
			// ask for confirmation
			var ans = window.confirm('Are you sure you want to delete this note? This action cannot be undone.');
			if (ans) {
				// delete all parts of the note
				window.localStorage.removeItem(noteId+'_body');
				window.localStorage.removeItem(noteId+'_title');
				window.localStorage.removeItem(noteId+'_date');
			} // if not confirmed do nothing
		};
	}
]);

noteControllers.controller('NoteCtrl', ['$scope', '$routeParams',  'noteStorageService',
	function($scope, $routeParams, noteStorageService){
		var noteId = $routeParams.id;

		// function for getting formatted date
		var getDate = function() {
			var currentDate = new Date()
  			var day = currentDate.getDate()
  			var month = currentDate.getMonth() + 1 // january = 0
 			var year = currentDate.getFullYear()
			return month + "/" + day + "/" + year;
		};

		// check to see if it's a new note
		if (noteId == "new") {
			// set to blank title/body
			$scope.title = "";
			$scope.body = "";
			$scope.date = getDate();
		} else {
			// otherwise load the note
			$scope.title = noteStorageService.getNoteTitle(noteId);
			$scope.body = noteStorageService.getNoteBody(noteId);
			$scope.date = noteStorageService.getNoteDate(noteId);
		}

		// function for saving a note
		$scope.saveNote = function(noteTitle, noteBody) {
			// check if the note is empty before saving
			if (noteTitle.length > 0 && noteBody.length > 0) {
				// get current note id
				var currentId;
				if (noteId == "new") {
					currentId = noteStorageService.getNoteCount();
					// increase the note count for the next new note
					noteStorageService.addNoteCount();
				} else {
					currentId = noteId;
				}

				// save the note
				window.localStorage.setItem(currentId+"_body", noteBody);
				window.localStorage.setItem(currentId+"_title", noteTitle);
				window.localStorage.setItem(currentId+"_date", getDate());

				window.alert("Note Saved!");
			} else {
				window.alert("Note title and/or body cannot be empty.");
			}
		};

	}
]);


