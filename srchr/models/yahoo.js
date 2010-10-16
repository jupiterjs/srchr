steal.plugins("jquery/model").then("yql", function() {

	$.Model.extend("Srchr.Models.Yahoo", {
		findAll: function( params, success, error ) {
			var self = this;
			$.yql("SELECT * from search.images where query='#{query}'", params, function( data ) {
				if ( data.query.results ) {
					success(self.wrapMany(data.query.results.result))
				}
			});

		}
	}, {

	})


});