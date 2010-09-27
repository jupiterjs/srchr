module("srchr/history",{
	setup : function(){
		S.open('//srchr/history/history.html')
	}
});




test("Add and remove history", function(){
	
	S("#searchText").type("hello world\r", function(){
		
		equals( S(".search:contains('hello world')").size(), 1 , "there is one hello world" );
		
	});
	
	S(".search:contains('hello world')").find(".remove").click()
	
	S(".search:contains('hello world')").size(0, function(){
		ok("no more world")
	});
});


test("add and refresh", function(){
	
	S("#searchText").type("hello world\r", function(){
		
		equals( S(".search:contains('hello world')").size(), 1 , "there is one hello world" );
		
	});
	S.open('//srchr/history/history.html', function(){
		equals( S(".search:contains('hello world')").size(), 1 , "there is one hello world" );
	});
	S(".search:contains('hello world')").find(".remove").click()
})


test("populate search", function(){
	S("#searchText").type("hello world\r", function(){
		
		equals( S(".search:contains('hello world')").size(), 1 , "there is one hello world" );
		
	})
	.type("[ctrl]a[ctrl-up]\b");
	
	S(".search:contains('hello world')").click( function(){
		
		equals( S("#searchText").val(), "hello world" , "hello world is set again" );
		
	});
	
})

