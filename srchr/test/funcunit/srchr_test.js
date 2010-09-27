module("srchr test", { 
	setup: function(){
        S.open("//srchr/srchr.html");
	}
});

test('Valid query and service loads results and switces to tab', function(){
	S.wait(1000)
	S('input[value=Srchr.Models.Yahoo]').click();
	//S('#query').click().type('hello world\r');
	
	//ok(S('#flickr').html(), 'Results were retrieved.')
})
