//steal/js srchr/tabs/scripts/compress.js
load("steal/rhino/steal.js");
steal.plugins('steal/clean', function() {
	steal.clean('srchr/tabs/tabs.html', {
		indent_size: 1,
		indent_char: '\t'
	});
});