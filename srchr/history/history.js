steal.plugins('jquery/controller',
	'jquery/model/list/cookie',
	'jquery/view/ejs').then(function($){



/**
 * An abstract list widget that listens for items being created,
 * shows them in a list, and then saves them in cookies for later retrieval.  
 */
$.Controller.extend("Srchr.History",
{
	defaults : {
		listenTo : document.documentElement,
		storeName : "searchHistory",
		//returns html to be displayed for each item on the list
		titleHelper : function(instance){
			return "Item"+instance[instance.Class.id]
		}
	}
},
{
	init : function(){
		this.instances = new $.Model.List.Cookie([]).retrieve(this.options.storeName)
		this.addInstances(this.instances)
		
		this.bind(this.options.listenTo, "search.created", "created");
	},
	created : function(el, ev, instance){
		if(!this.instances.get(instance).length){
			this.instances.push(instance);
			this.addInstances([instance])
		}
		
	},
	addInstances : function(instances){
		this.element.append(this.view('add',{
			data: instances,
			titleHelper : this.options.titleHelper
		}));
		this.instances.store(this.options.storeName);
	},
	".remove click" : function(el, ev){
		var li = el.closest('li'),
			toBeRemoved = li.model();
		this.instances.remove(toBeRemoved);
		this.instances.store(this.options.storeName);
		li.fadeOut(function(){
			li.remove();
		});
		ev.stopImmediatePropagation()
	},
	"li click" : function(el, ev){
		$(this.options.listenTo).trigger("search.selected", el.model())
	}
})
	
});