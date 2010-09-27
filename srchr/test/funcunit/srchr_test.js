module("srchr test", { 
	setup: function(){
        S.open("//srchr/srchr.html");
	}
});

/*test("Copy Test", function(){
	equals(S("h1").text(), "Welcome to JavaScriptMVC 3.0!","welcome text");
});*/

test('Valid query and service loads results and switces to tab', function(){
	S('input[value=Srchr.Models.Yahoo]').click()
	S('#query').click().type('hello world\r');
	
})
