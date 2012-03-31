(function(){

	Models = {};

	Models.Upcoming = can.Model({
		findAll : function(params){
			return $.ajax({
				url : "http://query.yahooapis.com/v1/public/yql",
				dataType : "jsonp",
				data : {
					q: "SELECT * FROM upcoming.events WHERE description LIKE '%{query}%' OR name LIKE '%{query}%' OR tags='{query}'".replace("{query}", params.query),
					format: "json",
					env: "store://datatables.org/alltableswithkeys",
					callback: "?"
				},
				dataType : 'jsonp'
			})
		},
		models : function(data){
			var results = data.query.results ? data.query.results.event : [];
			return can.Model.models.call(this, results);
		}
	}, {});

	Models.Twitter = can.Model({
		findAll : function(params){
			return $.ajax({
				url : "http://search.twitter.com/search.json",
				dataType : "jsonp",
				data: {
					q: params.query
				},
				dataType : 'jsonp'
			})
		},
		models : function(data){
			return can.Model.models.call(this, data.results);
		}
	},{});

	Models.Search = can.Model({
		id: "query"
	}, {});


		/**
	 * Creates a form to search with, as well as defining a search type (Model).
	 * 
	 * @tag controllers, home
	 */
	Search = can.Control(
	/* @static */
	{
		defaults : {
			defaultText : "Search for things here"
		}
	},
	/* @prototype */
	{
		/**
		 * Initialize a new instance of the Search controller.
		 */
		init : function(){
			this.element.html(can.view('searchInitEJS', this.options));
		},
		
		/**
		 * Highlights 'el' for 'time' milliseconds.
		 * 
		 * @param {Object} el The element to highlight.
		 * @param {Object|null} time The amount of time to highlight for.  Default is 1000 milliseconds
		 */
		flash  : function(el, time){
			el.addClass('highlight');
			
			setTimeout(function(){
				el.removeClass('highlight');
			}, +time || 1000, 10);
		},
		
		/**
		 * Binds to the search form submission.  Prevents the default action and fires the "search.created" event. 
		 * @param {Object} el The event target element.
		 * @param {Object} ev The event being fired.
		 */
		"form submit" : function(el, ev){
			ev.preventDefault();
			
			var formParams = can.deparam(el.serialize());

			var search = new Models.Search(formParams),
				ok = true;
			
			// If no search type was selected, flash the .options UL and don't trigger search.created
			if(!search.types){
				this.flash(this.element.find('.options'));
				ok = false;
			}
			
			// If the default wasn't changed, flash the text field and don't trigger search.created
			if(search.query == this.options.defaultText){
				this.flash(this.element.find('input[type=text]'));
				ok = false;
			}
			
			// If everything is valid, trigger search.created
			if(ok){
				$([Models.Search]).trigger("search",search);
			}
			
			
		},
		/**
		 * Binds on the search box for when it is focused.  Removes the blurred class and removes the default text.
		 * @param {Object} el The event target element.
		 * @param {Object} ev The event being fired.
		 */
		"input[type=text] focusin" : function(el, ev){
			if(el.val() == this.options.defaultText){
				el.val("");
			}
			el.removeClass('blurred');
		},
		
		/**
		 * Binds on the search box for when it is blurred.  Adds the blurred class and inputs the default text if none was provided by the user.
		 * @param {Object} el The event target element.
		 * @param {Object} ev The event being fired.
		 */
		"input[type=text] focusout" : function(el, ev){
			if(el.val() === ""){
				el.val(this.options.defaultText).addClass('blurred');
			}
		},
		
		/**
		 * Focuses on the search query box on page load.
		 */
		"{document} load" : function(){
			//if we are attached when the page loads, focus on our element
			this.element.find("input[name=query]")[0].focus();
		},
		
		/**
		 * Updates the checkboxes to reflect the user's desired search engine preferences.  Also fires search. 
		 */
		val : function(data){
			this.element.find("input[name=query]").val(data.query)[0].focus();
			var checks = this.element.find("input[type=checkbox]").attr("checked",false);
			for(var i =0; i < data.types.length; i++){
				checks.filter("[value="+data.types[i].replace(/\./g,"\\.")+"]").attr("checked",true);
			}
			
			$([Models.Search]).trigger('search', data);
		}
	});


	/**
	 * Shows the search results of a query.
	 * @tag controllers, home
	 */
	SearchResult = can.Control(
	/* @static */
	{
		defaults: {
			resultView : "searchResultEJS"
		}
	},
	/* @prototype */
	{	
		/**
		 * If the results panel is visible, then get the results.
		 * @param {Object} el The element that the event was called on.
		 * @param {Object} ev The event that was called.
		 * @param {Object} searchInst The search instance to get results for.
		 */
		"{Models.Search} search": function(el, ev, searchInst){
			this.currentSearch = searchInst.query;
			
			if (this.element.is(':visible')){
				this.getResults();
			}
		},
		/**
		 * Show the search results. 
		 */
		" show": function(){
			this.getResults();
		},
		
		/**
		 * Get the appropriate search results that this Search Results container is supposed to show.
		 */
		getResults: function(){
			// If we have a search...
			if (this.currentSearch){
				
				// and our search is new ...
				if(this.searched != this.currentSearch){
					// put placeholder text in the panel...
					this.element.html("Searching for <b>"+this.currentSearch+"</b>");
					// and set a callback to render the results.
					this.options.modelType.findAll({query: this.currentSearch}, $.proxy(this.renderResults, this));
					this.searched = this.currentSearch;
				}
				
			}else{
				// Tell the user to make a valid query
				this.element.html("Enter a search term!");
			}
			
		},
		
		/**
		 * Bind the data for this controller to its view.
		 * @param {Object} data The data to bind.
		 */
		renderResults: function(data){
			if(data && data.length > 0){
				this.element.html(can.view('searchResultsEJS',{data: data, options: this.options }));
			} else {
				this.element.html("No data found for <b>" + this.currentSearch + "</b>")
			
			}
			
		}
	});

	/**
	 * A basic tabs controller for showing and hiding content.
	 *
	 *     
	 *     <ul id='resultsTab'>
	 *       <li><a href='#twitter'>Twitter</a></li>
	 *       <li><a href='#upcoming'>Upcoming</a></li>
	 *     </ul>
	 *     
	 *     <div id='flickr'></div>
	 *     <div id='yahoo'></div>
	 *     <div id='upcoming'></div>
	 * 
	 *     new Tabs($("#resultsTab"));
	 * 
	 * <code>#resultsTab</code> Will be transformed into working tabs that the user can click to use.  The <code>href</code>s must correspond the to the jQuery selector of the content element it represents.
	 * 
	 * @tag controllers, home
	 */
	Tabs = can.Control(
	/* @prototype */
	{

		/**
		 * Initialize a new Tabs controller.
		 * @param {Object} el The UL element to create the tabs controller on
		 */
		init: function() {

			// activate the first tab
			this.activate(this.element.children("li:first"));

			// hide other tabs
			var tab = this.tab;
			this.element.addClass('ui-helper-clearfix').children("li:gt(0)").each(function() {
				tab($(this)).hide();
			});
		},

		// helper function finds the tab for a given li
		/**
		 * Retrieves a tab contents for a given tab
		 * @param {Object} li The LI to retrieve the tab for.
		 */
		tab: function( li ) {
			return $(li.find("a").attr("href"));
		},

		// on an li click, activates new tab 
		/**
		 * Binds on an LI to trigger "activate" on a new tab.
		 * @param {Object} el The element to trigger "activate" on.
		 * @param {Object} ev The event to prevent the default action for.
		 */
		"li click": function( el, ev ) {
			ev.preventDefault();
			el.trigger("activate");
		},

		/**
		 * Event handler for the "activate" event.
		 * @param {Object} el The element to activate
		 * @param {Object} ev The event that was fired.
		 */
		"li activate": function( el, ev ) {
			this.activate(el);
		},

		/**
		 * Hide all tabs, show the new one.
		 * @param {Object} The element to show.
		 */
		activate: function( el ) {
			this.tab(this.element.find('.active').removeClass('active')).hide();
			this.tab(el.addClass('active')).show().trigger("show");
		}
	});



	HistoryList = can.Observe.List({
		store : "searchHistory",
		retrieve : function(){
			var data =  $.cookie(this.store);
			return new HistoryList(data ? $.evalJSON(data) : []);
		}
	}, 
	{
		init : function(){
			this.bind('change', $.proxy(this.save, this));
		},
		save : function(){
			$.cookie(this.constructor.store, $.toJSON(this.attr()));
		}
	})

	/**
	 * Provides a cookie-stored list of model instances. 
	 * It allows you to remove these items from the list. 
	 * @tag controllers, home
	 */
	History = can.Control(
	/* @static */
	{
		defaults : {
			titleHelper : function(search){
				var text = search.attr('query'),
						types = search.attr('types') || [],
						prettyNames = {
					"Models.Upcoming" : "u",
					"Models.Twitter" : "t"
				}
				prettyTypes = [];
				for(var i=0; i < types.length; i++){
					prettyTypes.push( prettyNames[types[i]] );
				}
				return text+" "+prettyTypes.join();
			}
		}
	},
	/* @prototype */
	{
		/**
		 * Initializes the list
		 */
		init : function(){
			this.history = HistoryList.retrieve();
			this.element.html(can.view('historyEJS', {history: this.history, titleHelper: this.options.titleHelper}))
		},
		"{Models.Search} search": function(el, ev, searchInst){
			if(this.history.indexOf(searchInst) === -1){
				this.history.push(searchInst)
			}
		},
		".remove click" : function(el, ev){
			var li = el.closest('li');
			this.history.splice(this.element.find('li').index(li), 1);
		},
		/**
		 * Fires "selected" and passes search data
		 * @param {Object} el The history entry that was clicked
		 * @param {Object} ev The event that was fired.
		 */
		"li click" : function(el, ev){
			el.trigger("selected", el.data('search'))
		}
	});

	var searchController = new Search($("#searchArea"))
	new SearchResult($('#upcoming'), { modelType: Models.Upcoming, resultView: 'searchResultUpcomingEJS' })
	new SearchResult($('#twitter'), { modelType: Models.Twitter, resultView: 'searchResultTwitterEJS' })
	new Tabs($("#resultsTabs"))
	new History($('#history'))

	$('#history').bind("selected", function(ev, search){
		searchController.val(search)
	})

})();