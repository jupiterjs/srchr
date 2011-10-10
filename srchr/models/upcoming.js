steal('jquery/model', function(){

$.Model("Srchr.Models.Upcoming",{
	findAll : function(params, success, error){
		return $.ajax({
			url : "http://query.yahooapis.com/v1/public/yql",
			dataType : "jsonp",
			data : {
				q: $.String.sub("SELECT * FROM upcoming.events WHERE description LIKE '%{query}%' OR name LIKE '%{query}%' OR tags='{query}'", params),
				format: "json",
				env: "store://datatables.org/alltableswithkeys",
				callback: "?"
			},
			dataType : 'jsonp upcoming.models',
			success : success,
			error: error
		})
		
	},
	models : function(data){
		return this._super(data.query.results.event)
	}
},{})

});