
var Suggest = function(url, elem) {
    this.url = url;
    this.elem = elem;
    
    // TODO -- add correct event listener
    this.elem.click(function(){
        var value = $(this).val();
        // how to call parent class
        //.search(value);
    });

    this.init();
}

Suggest.prototype = {

    init : function() {
        console.log("init");
        this.draw();
    },

    //will place the html format for the suggestions drop-down
    draw : function() {
        // we didn't create the html for suggestions
        if(typeof $(".suggestions").html() === 'undefined') {
            $("body").append("<div class='suggestions'></div>");
        }
        suggestions = $(".suggestions");

        this.style(suggestions);
    },

    //will add styles to the html created by this.draw()
    style : function(target) {
        target.css("position", "absolute");
        target.css("width", this.elem.outerWidth()*1.05);
        target.css("min-height", "100px");
        target.css("background-color", "rgba(211, 208, 208, 0.88)");
        target.css("margin-top", "3px");
        target.css("overflow-y", "scroll");
        target.css("overflow-x", "hidden");

        //position straight below the form
        target.css("top", this.elem.offset().bottom);
        target.css("left", this.elem.offset().left);
        target.css("right", this.elem.offset().right);
    },

    search : function(value) {
        console.log("searching for: " + value);

        var jqjson = $.getJSON("/suggest/?query=" + value, function(data){
            console.log(data);
            console.log(data.name);
        });
    }
};

// Check if pre-requisites are met

if((typeof $) !== 'function') {
    throw "You need to include JQuery before this library";
} else {
    // if they are - Create chainable jQuery plugin:
    console.log("pre-requisites are okay!");

    $.fn.suggest = function(options, args) {
        // console.log(this.first()[0]);
        var s = new Suggest(options.url, $("#"+this.first()[0].id));
        s.search("catalin");
    }
}