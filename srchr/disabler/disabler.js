steal.plugins('jquery/controller','jquery/event/default').then(function($){
	
	$.Controller.extend("Srchr.Disabler",{
		defaults : {
			activateSelector :  "li",
			listenTo : document.documentElement
		}
	},{
		init: function(el){
			this.bind(this.options.listenTo, "search.created", "checkTypes");
		},
		
		"{activateSelector} activate" : function(el, ev){
			if(el.hasClass('disabled')){
				ev.preventDefault();
			}
		},
		
		// Listen for the search type
		checkTypes: function(el, ev, data){
			
			var types = [], 
				hitFirst = false;
			
			$.each(data.types, function(index, type){
				types.push(type.split('.')[2]);
			})
			
			this.element.find('li').addClass('disabled')
			
			if (types.length) {
				for (var i = 0; i < types.length; i++) {
					var el = this.element.find('a[href$=' + types[i].toLowerCase() + ']').parent()
					
					el.removeClass('disabled')
					
					if (!hitFirst) {
						el.trigger('activate')
						hitFirst = true;
					}
				}
			}
		}
	})
})
