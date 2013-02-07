steal('can', function(can){
	
return can.Model({
	findAll : function(params, success, error){
		return $.ajax({
			url : "http://query.yahooapis.com/v1/public/yql",
			dataType : "jsonp",
			data : {
				q: $.String.sub("SELECT * FROM flickr.photos.search WHERE has_geo='true' AND text='{query}'", params),
				format: "json",
				env: "store://datatables.org/alltableswithkeys",
				callback: "?"
			},
			dataType : 'jsonp flickr.models',
			success : success,
			error : error
		})
		
	},
	models : function(data){
		return this._super(data.query.flickr)
	}
},{});

});

