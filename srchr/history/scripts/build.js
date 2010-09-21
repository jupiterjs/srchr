//steal/js srchr/search_history/scripts/compress.js

load("steal/rhino/steal.js");
steal.plugins('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('srchr/search_history/search_history.html',{to: 'srchr/search_history'});
});
