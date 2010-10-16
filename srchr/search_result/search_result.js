steal.plugins('jquery/controller', 'jquery/view/ejs').then(function( $ ) {

	/**
	 * This controller shows the search results of a query.  It Upon being initialized, it binds on the <code>search.created</code> event.  It uses the model specified in the event data to execute the query, also specified in the event data.
	 * 
	 * @codestart
	 * $("#flickr").srchr_search_result({
	 modelType : Srchr.Models.Flickr,
	 resultView : "//srchr/views/flickr.ejs"
	 });
	 * @codeend
	 * 
	 * <p><code>#flickr</code> will be notified when a search is created.  If the search utilizes Srchr.Models.Flickr, then <code>#flickr</code> will be populated with results from Flickr.</p>
	 * @tag controllers, home
	 */
	$.Controller.extend("Srchr.SearchResult",
	/* @static */
	{
		defaults: {
			listenTo: document.documentElement,
			resultView: "//srchr/search_result/views/result.ejs"
		},
		listensTo: ["show"]
	},
	/* @prototype */
	{
		/**
		 * Initializes a new instance of Search Results container.
		 * @codestart
		 * $(selector).srchr_search_result({
		 *	modelType : Srchr.Models.Google,
		 *  listenTo : $('#searchBox')
		 * })
		 * @codeend
		 */
		init: function( element, options ) {
			this.bind(this.options.listenTo, "search.created", "created");
		},

		/**
		 * If the results panel is visible, then get the results.
		 * @param {Object} el The element that the event was called on.
		 * @param {Object} ev The event that was called.
		 * @param {Object} searchInst The search instance to get results for.
		 */
		"created": function( el, ev, searchInst ) {
			this.currentSearch = searchInst.query;

			if ( this.element.is(':visible') ) {
				this.getResults();
			}
		},

		/**
		 * Show the search results. 
		 */
		"show": function() {
			this.getResults();
		},

		/**
		 * Get the appropriate search results that this Search Results container is supposed to show.
		 */
		getResults: function() {
			// If we have a search...
			if ( this.currentSearch ) {

				// and our search is new ...
				if ( this.searched != this.currentSearch ) {
					// put placeholder text in the panel...
					this.element.html("Searching for " + this.currentSearch);
					// and set a callback to render the results.
					this.options.modelType.findAll({
						query: this.currentSearch
					}, this.callback('renderResults'));
					this.searched = this.currentSearch;
				}

			} else {
				// Tell the user to make a valid query
				this.element.html("Enter a search term!");
			}

		},

		/**
		 * Bind the data for this controller to its view.
		 * @param {Object} data The data to bind.
		 */
		renderResults: function( data ) {
			this.element.html(this.view('results', {
				data: data,
				options: this.options
			}));
		}
	});

});