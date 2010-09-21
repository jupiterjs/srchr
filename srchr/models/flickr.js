steal.plugins("jquery/model").then("yql", function(){

$.Model.extend("Srchr.Models.Flickr",{
	findAll : function(params, success, error){
		var self= this;
		$.yql(
		    "SELECT * from flickr.photos.search where has_geo='true' AND text='#{query}'",
		    params,
		    function (data) {
		        success(self.wrapMany(data.query.results.photo))
		    }
		);
		
	}
},{
	
})


});