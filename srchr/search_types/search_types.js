steal.plugins('jquery/controller').then(function($){
	$.Controller.extend("Srchr.SearchTypes",
	{
		defaults : {
			//name - model pairs
			models : Srchr.Models
		}
	},
	{
		init : function(){
			this.element.html()
		}
	})
})
	 