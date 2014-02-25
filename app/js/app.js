var app = (function() {

	'use strict';
	var privateVariable = 'app fired!',
		docElem = document.documentElement;

	return {
		publicFunction: function() {
			console.log(privateVariable);
		},
		userAgentInit: function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		}
	};

})();

(function() {

	'use strict';

	//foundation init
	$(document).foundation();

	app.publicFunction();
	app.userAgentInit();

	$('textarea').height( $('textarea')[0].scrollHeight+20 );

})();

(function() {
	'use strict';

	//  For generating GUID
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}

	function guid() {
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

	// Human readable timestamp
	function formatTimeOfDay(millisSinceEpoch) {
		var secondsSinceEpoch = (millisSinceEpoch / 1000) | 0;
		var secondsInDay = ((secondsSinceEpoch % 86400) + 86400) % 86400;
		var seconds = secondsInDay % 60;
		var minutes = ((secondsInDay / 60) | 0) % 60;
		var hours = (secondsInDay / 3600) | 0;
		return hours + (minutes < 10 ? ':0' : ':') + minutes + (seconds < 10 ? ':0' : ':') + seconds;
	}

	// The note object
	function Note() {
		this.id = guid();
		this.meta = formatTimeOfDay($.now());
		this.title = 'A note of epic proportion';
		this.body = 'Please type a note here...';
	}

	var singleNote = new Note();

	// Persistor for saving a getting from localStorage
	var persistor = {

		save: function(note) {
			localStorage.aNote = JSON.stringify(note);
		},

		get: function() {
			var aNoteLS = JSON.parse(localStorage.aNote);
			return aNoteLS;
		}
	};

	// Grab content of Note and save it to localStorage
	function saveAction() {
		var title = $('#noteTitle').val();
		var body = $('#noteBody').val();

		singleNote.meta = formatTimeOfDay($.now());
		singleNote.title = title;
		singleNote.body = body;

		$('.meta').text(singleNote.meta);
		console.log(singleNote);

		persistor.save(singleNote);
	}

	// Load the only note in localStorage
	function loadAction(note) {
		$('.meta').text(note.meta);
		$('#noteTitle').val(note.title);
		$('#noteBody').val(note.body);
	}

	// On page load retrieve and display the note in localStorage
	$( document ).ready(function() {
		var myNote = persistor.get();
		loadAction(myNote);
	});

	$('#save').click(saveAction);

})();
