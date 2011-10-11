steal('funcunit').then(function(){

	module("srchr/search",{
		setup : function(){
			S.open('//srchr/disabler/disabler.html');
		}
	});
	
	test('Is a tab disabled?', function(){
		
		// make sure that only flickr looks enabled
		S('button').click(function(){
			ok(!S('li:eq(0)').hasClass('disabled'), "Flicker is enabled.")
			ok(S('li:eq(1)').hasClass('disabled'), "Upcoming is disabled.")
		});
	})
	
	test('Is default prevented?', function(){
		
		
		S('button').click();
		
		S("a:contains(Upcoming)").click(function(){
			ok(S('#out').text(), "Activated Upcoming", "Default is prevented")
		});
		
		S("a:contains(Flickr)").click(function(){
			ok(S('#out').text(), "Activated Flickr", "Default is prevented only on non-matching tabs")
		});
		
	});

});