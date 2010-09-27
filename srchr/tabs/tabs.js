steal.plugins('jquery/controller','jquery/event/default')
	 .css('tabs')
	 .then(function(){
	
/**
 * Basic tabs controller for showing an hiding content.
 * @tag controllers, home
 */
$.Controller.extend("Srchr.Tabs",
/* @prototype */
{

	/**
	 * Initialize a new Tabs controller.
	 * @param {Object} el The UL element to create the tabs controller on
	 */
	init : function(el){
	
		// activate the first tab
		this.activate( $(el).children("li:first") )
		
		// hide other tabs
		var tab = this.tab;
		this.element.addClass('ui-helper-clearfix').children("li:gt(0)").each(function(){
			tab($(this)).hide()
		})
	},
	
	// helper function finds the tab for a given li
	/**
	 * Retrieves a tab for a given LI element
	 * @param {Object} li The LI to retrieve the tab for.
	 */
	tab : function(li){
		return $(li.find("a").attr("href"))
	},
	
	// on an li click, activates new tab 
	/**
	 * Binds on an LI to trigger "activate" on a new tab.
	 * @param {Object} el The element to trigger "activate" on.
	 * @param {Object} ev The event to prevent the default action for.
	 */
	"li click" : function(el, ev){
		ev.preventDefault();
		el.trigger("activate")
	},
	
	/**
	 * Default event handler for the "activate" event.
	 * @param {Object} el The element to activate
	 * @param {Object} ev The event that was fired.
	 */
	"li default.activate" : function(el, ev){
		this.activate(el)
	},
	
	/**
	 * Hide all tabs, show the new one.
	 * @param {Object} The element to show.
	 */
	activate : function(el){
		this.tab(this.find('.active').removeClass('active')).hide()
		this.tab(el.addClass('active')).show().trigger("show");
	}
})
	
})