steal.plugins('jquery/controller','jquery/event/default').then(function($){
	
	$.Controller.extend("Srchr.Disabler",{
		defaults : {
			activateSelector :  "li"
		}
	},{
		"{activateSelector} activate" : function(el, ev){
			if(el.hasClass('disabled')){
				ev.preventDefault();
			}
		}
	})
})
