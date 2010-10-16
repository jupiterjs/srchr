steal.plugins("jquery/model").then("yql", function() {

	$.Model.extend("Srchr.Models.Upcoming", {
		findAll: function( params, success, error ) {
			var self = this;
			$.yql("SELECT * FROM upcoming.events WHERE description LIKE '%#{query}%' OR name LIKE '%#{query}%' or tags='#{query}'",

			params, function( data ) {

				if ( data.query.results ) {
					success(self.wrapMany(
					data.query.count == "1" ? [data.query.results.event] : data.query.results.event))
				}
			});

		}
	}, {

	});


});