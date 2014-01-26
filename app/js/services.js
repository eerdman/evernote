'use strict';

/* Services */

// provides basic interaction with notes stored in localStorage
angular.module('noteAppServices',[]).factory('noteStorageService', function() {
	// if no notes exist, initialize the note count
	if (window.localStorage.getItem('noteCount') == null) {
		window.localStorage.setItem('noteCount', "0");
	} 
	return {
		getNoteTitle: function(noteId) {
			return window.localStorage.getItem(noteId+"_title");
		},
		getNoteBody: function(noteId) {
			return window.localStorage.getItem(noteId+"_body");
		},
		getNoteDate: function(noteId) {
			return window.localStorage.getItem(noteId+"_date");
		},
		getNoteCount: function() {
			return window.localStorage.getItem('noteCount');
		},
		addNoteCount: function() {
			var newCount = parseInt(window.localStorage.getItem('noteCount'))+1;
			window.localStorage.setItem('noteCount',newCount.toString());
		}
	}
});
