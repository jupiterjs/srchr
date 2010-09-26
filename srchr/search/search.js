steal.plugins('jquery/controller',
	'jquery/dom/form_params',
	'jquery/view/ejs')
	.css('search')
.then(
	"//srchr/models/search",
	function($){

/**
 * Creates a form to search with, searches with it
 */
$.Controller.extend("Srchr.Search",
{
	defaults : {
		defaultText : "search for things here"
	}
},
{
	init : function(){
		this.element.html(this.view(this.options));
		this.bind(document.documentElement, "search.selected","searchSelected")
	},
	flash  : function(el){
		el.addClass('highlight')
		setTimeout(function(){
			el.removeClass('highlight')
		}, 1000);
	},
	"form submit" : function(el, ev){
		ev.preventDefault();
		var search = new Srchr.Models.Search(el.formParams()),
			ok = true;
		if(!search.types.length){
			this.flash(this.find('.options'));
			ok = false;
		}
		if(search.query == this.options.defaultText){
			this.flash(this.find('input[type=text]'));
			ok = false;
		}
		
		if(ok){
			el.trigger("search.created",search);
		}
		
		
	},
	"input[type=text] focusin" : function(el, ev){
		if(el.val() == this.options.defaultText){
			el.val("")
		}
		el.removeClass('blurred')
	},
	"input[type=text] focusout" : function(el, ev){
		if(el.val() == ""){
			el.val(this.options.defaultText).addClass('blurred')
		}
	},
	load : function(){
		//if we are attached when the page loads, focus on our element
		this.find("input[name=query]")[0].focus()
	},
	searchSelected : function(el, ev, data){
		this.find("input[name=query]").val(data.query)[0].focus();
		var checks = this.find("input[type=checkbox]").attr("checked",false);
		for(var i =0; i < data.types.length; i++){
			checks.filter("[value="+data.types[i]+"]").attr("checked",true);
		}
		
		$(document.documentElement).trigger('search.created', data);
	}
});

});
	 