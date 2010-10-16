//steal/js srchr/tabs/scripts/compress.js
load("steal/rhino/steal.js");
steal.plugins('steal/build', 'steal/build/scripts', 'steal/build/styles', function() {
	steal.build('srchr/tabs/tabs.html', {
		to: 'srchr/tabs'
	});
});