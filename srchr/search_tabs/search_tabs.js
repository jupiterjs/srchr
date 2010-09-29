(function( $ ){

	/**
	 * This plugin generates tabs HTML that is compliant with the Srchr Tabs controller.
	 * It accepts the Srchr.Models object and dynamically creates the tabs HTML inside of the
	 * UL that it was called on.
	 * 
	 */
$.fn.search_tabs = function(models) {
  
	var modelsArr = [], lastModel;
	
		for (model in models){
			
			// Don't include the parent "Search" class
			if (model !== 'Search'){
				modelsArr.push(model)
			}
		}
	
	
	
	for (var i = 0; i < modelsArr.length; i++){
		this.append($('<li>')
				.html(
					$('<a>',{
						href : '#' + modelsArr[i]
					})
					.html(modelsArr[i])
				)
			);
	}
	
	// Looping through again so that the tabs' content divs show up in the same order as the tabs
	while (lastModel = modelsArr.pop()){
		this.after($('<div>', { id : lastModel }));
	}
	
	return this;
  };
})( jQuery );