steal.plugins('jquery/controller','jquery/event/default').then(function($){
	
	/**
	 * Disables tabs and prevents default behavior.
	 * @tag controllers, home
	 */
	$.Controller.extend("Srchr.Disabler",
	/* @static */
	{
		defaults : {
			activateSelector :  "li",
			listenTo : document.documentElement
		}
	},
	/* @prototype */
	{
		/**
		 * Initialize a new Disabler controller.
		 */
		init: function(){
			this.bind(this.options.listenTo, "search.created", "checkTypes");
		},
		
		/**
		 * Binds {activateSelector} to the "activate" event to prevent the default behavior if it has the 'disabled' class.
		 * @param {Object} el The element to prevent the default behavior on.
		 * @param {Object} ev The event to prevent.
		 */
		"{activateSelector} activate" : function(el, ev){
			if(el.hasClass('disabled')){
				ev.preventDefault();
			}
		},
		
		// Listen for the search type
		/**
		 * Determines the search types that were allowed and sets the "disabled" class on those that weren't.  Also activates the first that LI that is not disabled.
		 * @param {Object} el The element that the event was called on.
		 * @param {Object} ev The event that was called.
		 * @param {Object} data The data that was passed to the event.
		 */
		checkTypes: function(el, ev, data){
			
			var types = {}, 
				first = true;
			
			$.each(data.types, function(index, type){
				types[type.split('.')[2]] = true;
			})
			
			this.element.find('li').each(function(){
				var li = $(this)
				
				if(types [ li.text() ]){
					li.removeClass("disabled")
					if(first){
						li.trigger('activate')
						first = false;
					}
				}else{
					li.addClass("disabled")
				}
			})
		}
	})
})
