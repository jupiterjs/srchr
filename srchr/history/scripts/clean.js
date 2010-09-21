//steal/js srchr/search_history/scripts/compress.js

load("steal/rhino/steal.js");
steal.plugins('steal/clean',function(){
	steal.clean('srchr/search_history/search_history.html',{indent_size: 1, indent_char: '\t'});
});
