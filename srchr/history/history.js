steal.plugins('jquery/controller', 'jquery/model/list/cookie', 'jquery/view/ejs').then(function( $ ) {

	/**
	 * This is a list widget whose state is maintained across page loads via cookies.
	 * 
	 * @codestart
	 var typePrettyNames = {
	 "Srchr.Models.Flickr" : "f",
	 "Srchr.Models.Yahoo" : "y",
	 "Srchr.Models.Upcoming" : "u"
	 };
	 
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
	 * @codeend
	 * 
	 * <p><code>#history</code> will listen for the <code>#search.created</code> event.  When <code>#search.created</code> fires, this controller will intercept the search that is being run and display the search query and type as a list element (the actual formatting of the string is determined by the <code>titleHelper</code> option).</p>
	 * 
	 * <p>Clicking on any item in the list will create the new instance of the search that it represents.  It does so by firing <code>search.selected</code>.</p> 
	 * 
	 * <p>This controller also creates an "X" for each item in the list.  Clicking on this "X" will remove the list element from the page.</p>
	 * 
	 * <p>Since this module makes use of cookies, it must be running from some type of server, not file:///.  Localhost will work correctly.</p>
	 * 
	 * @tag controllers, home
	 */
	$.Controller.extend("Srchr.History",
	/* @static */
	{
		defaults: {
			listenTo: document.documentElement,
			storeName: "searchHistory",
			//returns html to be displayed for each item on the list
			titleHelper: function( instance ) {
				return "Item" + instance[instance.Class.id];
			}
		}
	},
	/* @prototype */
	{
		/**
		 * Sets up a new instance of History controller.
		 */
		ready: function() {

			this.instances = new $.Model.List.Cookie([]).retrieve(this.options.storeName);
			this.addInstances(this.instances);
			this.bind(this.options.listenTo, "search.created", "created");
		},

		/**
		 * Binds on a the "search.created" event.
		 * @param {Object} el The element that the event was fired on.
		 * @param {Object} ev The event that was fired.
		 * @param {Object} newInstance The data to add to the instances list.
		 */
		created: function( el, ev, newInstance ) {

			if (!this.instances.get(newInstance).length ) {
				this.instances.push(newInstance);
				this.addInstances([newInstance]);
			}
		},

		/**
		 * Add some history entry instances to the list.
		 * @param {Object} instances The instances to add.
		 */
		addInstances: function( instances ) {
			this.element.append(this.view('add', {
				data: instances,
				titleHelper: this.options.titleHelper
			}));
			this.instances.store(this.options.storeName);
		},

		/**
		 * Binds the "remove" class on click.  Removes a history entry.
		 * @param {Object} el The history event to remove.
		 * @param {Object} ev The event that was fired.
		 */
		".remove click": function( el, ev ) {
			var li = el.closest('li'),
				toBeRemoved = li.model();
			this.instances.remove(toBeRemoved);
			this.instances.store(this.options.storeName);

			li.fadeOut(function() {
				li.remove();
			});
			ev.stopImmediatePropagation();
		},

		/**
		 * Fires "search.selected" and passes el.model().
		 * @param {Object} el The history entry that was clicked
		 * @param {Object} ev The event that was fired.
		 */
		"li click": function( el, ev ) {
			$(this.options.listenTo).trigger("search.selected", el.model());
		}
	});

});