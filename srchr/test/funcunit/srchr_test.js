module("srchr test", { 
	setup: function(){
        S.open("//srchr/srchr.html");
	}
});

var queries = ['hello world', 'jupiter']

function helloWorldSearchSearchCreated(){
	ok(S('#yahoo').html(), 'Results were retrieved.')
	ok(S('#resultsTab li:eq(0)').hasClass('disabled'), "Non-selected tab Flickr is disabled.")
	ok(!S('#resultsTab li:eq(1)').hasClass('disabled'), "Selected tab Yahoo is enabled.")
	ok(S('#resultsTab li:eq(2)').hasClass('disabled'), "Non-selected tab Upcoming is disabled.")
}

test('Valid query and service loads results and switces to tab', function(){
	
	S('input[value=Srchr.Models.Yahoo]').click();
	S('#query').click().type(queries[0] + '\r');
	
	S.wait(3000, function(){
		
		helloWorldSearchSearchCreated();
		
		ok( (new RegExp(queries[0])).test( S('#history .text:eq(0)').text() ), 'Query appears in the history list.')
	})
	
})

test('Switching results tabs', function(){
	S('input[value=Srchr.Models.Yahoo]').click();
	S('input[value=Srchr.Models.Flickr]').click();
	
	S('#query').click().type(queries[1] + '\r');
	
	S.wait(3000, function(){
		ok(!S('#resultsTab li:eq(0)').hasClass('disabled'), "Selected tab Flickr is enabled.")
		ok(!S('#resultsTab li:eq(1)').hasClass('disabled'), "Selected tab Yahoo is enabled.")
		ok(S('#resultsTab li:eq(2)').hasClass('disabled'), "Non-selected tab Upcoming is disabled.")
		
		equals(S('#flickr').css('display'), 'block', 'Flickr results panel is visible')
		
		S('#resultsTab li:eq(1)').click(function(){
			equals(S('#flickr').css('display'), 'none', 'Flickr results panel is hidden')
			equals(S('#yahoo').css('display'), 'block', 'Yahoo results panel is hidden')
		})
		
		
	})
})

test('Clicking history entries re-creates the search', function(){
	S('.srchr_models_search_hello').click(function(){
		equals(S('#query').val(), queries[0], '"' + queries[0] + '" was put back into the query field')
		helloWorldSearchSearchCreated()
	})
})

test('History entries are unique', function(){
	S('input[value=Srchr.Models.Yahoo]').click();
	S('#query').click().type(queries[0] + '\r');
	
	equals(S('#history li').size(), 2, 'A duplicate History entry was not added')
})

test('Refresh the page does not change the state of the history list', function(){
	S.open("//srchr/srchr.html", function(){
		equals(S('#history li').size(), 2, 'The History list persisted across the page loads')
	});
		
})

test('All history entries are deletable', function(){
	for (var i = S('#history li').size() - 1; i > -1; i--){
		S('#history li a.remove:eq(' + i + ')').click()
	}
	
	S('#history li').size(0)
	ok(S('#history li').size(), 'All history entries were removed.')
})