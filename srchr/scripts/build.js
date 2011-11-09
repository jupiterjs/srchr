//steal/js srchr/scripts/compress.js
load("steal/rhino/rhino.js");
steal('steal/build', 'steal/build/scripts', 'steal/build/styles', function() {
	steal.build('srchr/srchr.html', {
		to: 'srchr'
	});
});
