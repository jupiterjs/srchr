steal.plugins('srchr/search',
	'srchr/history',
	'srchr/search_result',
	'srchr/tabs',
	'srchr/disabler')
	.models('flickr','yahoo','upcoming')
		
.then(function($){
	
	$("#searchArea").srchr_search();
	
	var typePrettyNames = {
		"Srchr.Models.Flickr" : "f",
		"Srchr.Models.Yahoo" : "y"
	}
	
	$("#history").srchr_history({
		titleHelper : function(search){
			var text =  search.query
				types = [];
			for(var i=0; i < search.types.length; i++){
				types.push( typePrettyNames[search.types[i]] )
			}
			return  text+" "+types.join();
		}
	});	
	
	$("#resultsTab").srchr_tabs().srchr_disabler();
	
	$("#flickr").srchr_search_result({
		modelType : Srchr.Models.Flickr,
		resultView : "//srchr/views/flickr.ejs"
	});
	
	$("#yahoo").srchr_search_result({
		modelType : Srchr.Models.Yahoo,
		resultView : "//srchr/views/yahoo.ejs"
	});
	
	$("#upcoming").srchr_search_result({
		modelType : Srchr.Models.Upcoming,
		resultView : "//srchr/views/upcoming.ejs"
	});	
})
	

	 