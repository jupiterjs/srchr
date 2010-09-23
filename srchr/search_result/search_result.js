steal.plugins('jquery/controller','jquery/view/ejs').then(function($){
	
$.Controller.extend("Srchr.SearchResult",{
	defaults: {
		listenTo : document.documentElement,
		resultView : "//srchr/search_result/views/result.ejs"
	},
	listensTo : ["show"]
},{
	/**
	 * @codestart
	 * $(selector).srchr_search_result({
	 * 	modelType : Srchr.Models.Google,
	 *  listenTo : $('#searchBox')
	 * })
	 * @codeend
	 */
	init: function(element, options){
		this.bind(this.options.listenTo, "search.created", "created");
	},
	
	"created": function(el, ev, searchInst){
		this.currentSearch = searchInst.query;
		if (this.element.is(':visible')){
			this.getResults();
		}
	},
	
	"show": function(){
		this.getResults();
	},
	
	getResults: function(){
		// if we have a search
		if (this.currentSearch){
			
			// and our search is new ...
			if(this.searched != this.currentSearch){
				this.element.html("Searching for "+this.currentSearch)
				this.options.modelType.findAll({query: this.currentSearch}, this.callback('renderResults'));
				this.searched = this.currentSearch
			}
			
		}else{
			this.element.html("Enter a search term!")
		}
		
	},
	
	renderResults: function(data){
		console.log(data)
		this.element.html(this.view('results',{data: data, options: this.options }));
	}
})
	
});
	 