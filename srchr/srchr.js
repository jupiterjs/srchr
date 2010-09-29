/**
 * @page index home
 * 
 * <h1>Srchr demonstration application</h1>
 * 
 * <p>Srchr is an example app that consists of all of the components of a JavaScriptMVC application.  It gets a user's query and then performs a search against the desired Yahoo! search services.  It's architecture is comprised of:</p>
 * <ul>
 * <li>Models</li>
 * <li>Controllers</li>
 * <li>Views</li>
 * </ul>
 * 
 * <h2>The Models</h2>
 * ...
 * 
 * <h2>The Controllers</h2>
 * 
 * <p>There are five controllers that make up Srchr:</p>
 * 
 * <ul>
 * <li>Search - Collects the search request from the user.</li>
 * <li>Search Result - Receives the search request data, executes and displays it.</li>
 * <li>History - Maintains a list of previous searches and recreates them upon user request.</li>
 * <li>Tabs - Shows and hides data.</li>
 * <li>Disabler - Based on the search engines that were or were not selected, this enables and disables the respective sections of the content-toggling mechanism (tabs).</li>
 * </ul>
 * 
 * All of the controllers are designed to work with each other, but also work independantly of each other and be swapped out if need be.  Check out each controller's page to learn about how to use it.
 * 
 */

// Load all of the plugin dependencies
steal.plugins('srchr/search',
	'srchr/history',
	'srchr/search_result',
	'srchr/tabs',
	'srchr/search_tabs',
	'srchr/disabler')
	.models('flickr','yahoo','upcoming')
		
.then(function($){
	
	// This is the Srchr application.  It integrates all of the Srchr modules.
	
	// Create a new Search controller on the #searchArea element
	$("#searchArea").srchr_search();
	
	// Instead of printing out the Model names in their entirety in the history list,
	// just print out the first letter
	var typePrettyNames = {
		"Srchr.Models.Flickr" : "f",
		"Srchr.Models.Yahoo" : "y",
		"Srchr.Models.Upcoming" : "u"
	};
	
	// Create a new History controller on the #history element
	$("#history").srchr_history({
		titleHelper : function(search){
			var text =  search.query,
				types = [];
			for(var i=0; i < search.types.length; i++){
				types.push( typePrettyNames[search.types[i]] );
			}
			return  text+" "+types.join();
		}
	});
	
	// Create new Tabs and Disabler controllers on the #resultsTab element 
	$("#resultTabs")
		.search_tabs(Srchr.Models)
		.srchr_tabs()
		.srchr_disabler();
	
	// Create new Search Results controller on the #flickr element 
	$("#Flickr").srchr_search_result({
		modelType : Srchr.Models.Flickr,
		resultView : "//srchr/views/flickr.ejs"
	});
	
	// Create new Search Results controller on the #yahoo element
	$("#Yahoo").srchr_search_result({
		modelType : Srchr.Models.Yahoo,
		resultView : "//srchr/views/yahoo.ejs"
	});
	
	// Create new Search Results controller on the #upcoming element
	$("#Upcoming").srchr_search_result({
		modelType : Srchr.Models.Upcoming,
		resultView : "//srchr/views/upcoming.ejs"
	});
		
});