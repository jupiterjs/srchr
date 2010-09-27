steal.plugins('jquery/controller',
	'jquery/model/list/cookie',
	'jquery/view/ejs').then(function($){



/**
 * An abstract list widget that listens for items being created,
 * shows them in a list, and then saves them in cookies for later retrieval.  
 * @tag controllers, home
 */
$.Controller.extend("Srchr.History",
/* @static */
{
	defaults : {
		listenTo : document.documentElement,
		storeName : "searchHistory",
		//returns html to be displayed for each item on the list
		titleHelper : function(instance){
			return "Item"+instance[instance.Class.id]
		}
	},
	
	/**
	 * Determines if two history lists contain the same thing.
	 * @param {Object} history1
	 * @param {Object} history2
	 */
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
/* @prototype */
{
	/**
	 * Sets up a new instance of History controller.
	 */
	ready : function(){
		this.instances = new $.Model.List.Cookie([]).retrieve(this.options.storeName)
		this.addInstances(this.instances)
		
		this.bind(this.options.listenTo, "search.created", "created");
	},
	
	/**
	 * Binds on a the "search.created" event.
	 * @param {Object} el The element that the event was fired on.
	 * @param {Object} ev The event that was fired.
	 * @param {Object} newInstance The data to add to the instances list.
	 */
	created : function(el, ev, newInstance){
		
		if(!this.instances.get(newInstance).length){
			this.instances.push(newInstance);
			this.addInstances([newInstance])
		}
		
		
	},
	
	/**
	 * Sees if "instance" is already in the instances list.
	 * @param {Object} instance The instance to look for.
	 */
	matchInstance : function(instance){ 
		
		for (var i = 0; i < this.instances.length; i++){
			if (this.instances[i].query == instance.query
					&& Srchr.History.areTypesEqual(this.instances[i], instance)){
					
					return this.instances[i];
				}
		}
		
		return false;
	},
	
	/**
	 * Add some history entry instances to the list.
	 * @param {Object} instances The instances to add.
	 */
	addInstances : function(instances){
		this.element.append(this.view('add',{
			data: instances,
			titleHelper : this.options.titleHelper
		}));
		this.instances.store(this.options.storeName);
	},
	
	/**
	 * Binds the "remove" class on click.  Removes a history entry.
	 * @param {Object} el The history event to remove.
	 * @param {Object} ev The event that was fired.
	 */
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
	
	/**
	 * Fires "search.selected" and passes el.model().
	 * @param {Object} el The history entry that was clicked
	 * @param {Object} ev The event that was fired.
	 */
	"li click" : function(el, ev){
		$(this.options.listenTo).trigger("search.selected", el.model())
	}
})
	
});