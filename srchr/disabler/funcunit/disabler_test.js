module("srchr/search",{
	setup : function(){
		S.open('//srchr/disabler/disabler.html')
	}
});

test('Is a tab disabled?', function(){
	S('button').click(function(){
		ok(!S('li:eq(0)').hasClass('disabled'), "Flicker is enabled.")
		ok(S('li:eq(1)').hasClass('disabled'), "Yahoo is disabled.")
		ok(S('li:eq(2)').hasClass('disabled'), "Upcoming is disabled.")
	});
})

test('Is default prevented?', function(){
	S('button').click();
	S('li:eq(1)').click(function(){
		ok(!S('span').text().length, "Clicking on a disabled link didn't do anything.")
	});
})