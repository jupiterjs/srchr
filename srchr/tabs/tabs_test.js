steal("srchr/tabs","funcunit",function(Tabs, S){
	
var tabsHTML ="<ul id='resultsTab'>\
	<li><a href='#flickr'>Flickr</a></li>\
	<li><a href='#yahoo'>Yahoo</a></li>\
	<li><a href='#upcoming'>Upcoming</a></li>\
</ul>\
<div id='flickr' class='tab'>one</div>\
<div id='yahoo' class='tab'>two</div>\
<div id='upcoming' class='tab'>three</div>";


	module("srchr/tabs",{
		setup : function(){
			$("#qunit-test-area").html(tabsHTML);
			new Tabs("#resultsTab")
		},
		teardown: function(){
			$("#qunit-test-area").empty()
		}
	});
	
	
	test("Proper hiding and showing", function() {
		S("[href=\\#yahoo]").click();
		S("#yahoo").visible(function() {
			equals(S("#flickr").css('display'), 'none', "Old tab contents are hidden");
			ok(!S("[href=\\#flickr]").parent().hasClass('active'), 'Old tab is not set to active');
			ok(S("[href=\\#yahoo]").parent().hasClass('active'), 'New tab is set to active');
		});
	});
	
	test("Clicking twice doesn't break anything", function() {
		S("[href=\\#upcoming]").click();
		S("[href=\\#upcoming]").click();
	
		S("#upcoming").visible(function() {
			equals(S("#upcoming").css('display'), 'block', "New tab contents are visible");
			ok(S("[href=\\#upcoming]").parent().hasClass('active'), 'New tab is set to active');
		});
	});

})