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
	},
	
	areTypesEqual : function(history1, history2){
		
		history1 = history1.types;
		history2 = history2.types;
		
		if (history1.length !== history2.length){
			return false;
		}
		
		for (var i = 0; i < history1.length; i++){
			if (history1[i] !== history2[i]){
				return false;
			}
		}
		
		return true;
	}
},
{
	init : function(){
		this.instances = new $.Model.List.Cookie([]).retrieve(this.options.storeName)
		this.addInstances(this.instances)
		
		this.bind(this.options.listenTo, "search.created", "created");
	},
	created : function(el, ev, newInstance){
		
		if (!this.matchInstance(newInstance)){
			this.instances.push(newInstance);
			this.addInstances([newInstance])
		}
		
		
	},
	
	matchInstance : function(instance){ 
		
		for (var i = 0; i < this.instances.length; i++){
			if (this.instances[i].query == instance.query
					&& Srchr.History.areTypesEqual(this.instances[i], instance)){
					
					return this.instances[i];
				}
		}
		
		return false;
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
			el.remove();
		});
		ev.stopImmediatePropagation()
	},
	"li click" : function(el, ev){
		$(this.options.listenTo).trigger("search.selected", el.model())
	}
})
	
});