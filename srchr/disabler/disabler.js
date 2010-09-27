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
