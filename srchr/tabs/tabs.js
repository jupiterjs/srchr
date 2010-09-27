steal.plugins('jquery/controller','jquery/event/default')
	 .css('tabs')
	 .then(function(){
	
	
$.Controller.extend("Srchr.Tabs",{

	// initialize code
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
	tab : function(li){
		return $(li.find("a").attr("href"))
	},
	
	// on an li click, activates new tab  
	"li click" : function(el, ev){
		ev.preventDefault();
		el.trigger("activate")
	},
	"li default.activate" : function(el, ev){
		this.activate(el)
	},
	//hides old activate tab, shows new one
	activate : function(el){
		this.tab(this.find('.active').removeClass('active')).hide()
		this.tab(el.addClass('active')).show().trigger("show");
	}
})
	
})