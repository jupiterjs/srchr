steal("jquery/model").then(function(){

$.Model("Srchr.Models.Twitter",{
	findAll : function(params, success, error){
		return $.ajax({
			url : "http://search.twitter.com/search.json",
			dataType : "jsonp",
			data: {
				q: params.query
			},
			dataType : 'jsonp twitter.models',
			success : success,
			error : error
		})
	},
	models : function(data){
		return this._super(data.results)
	}
},{
	
});


});