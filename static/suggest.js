var Suggest = function(url, elem) {
    this.url = url;
    this.elem = elem;
    that = this;
    this.data = null;
    this.suggestions = null;

    // Event listener for keypress in input field
    this.elem.keyup(function(e){
        var value = $(this).val();
        if(value !== "") {
            that.search(value);
            that.showBox();
        } else {
            that.hideBox();
        }
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
        this.suggestions = $(".suggestions");

        this.style(this.suggestions);
    },

    //will add styles to the html created by this.draw()
    style : function(target) {
        target.css("position", "absolute");
        target.hide();
        target.css("width", this.elem.outerWidth());
        target.css("min-height", "100px");
        target.css("max-height", window.innerHeight * 0.5);
        target.css("background-color", "gba(255, 255, 255, 0.88)");
        target.css("box-shadow", "0px 0px 8px rgba(0,0,0,0.3)");
        target.css("margin-top", "3px");
        target.css("overflow", "hidden");

        //position straight below the form
        target.css("top", this.elem.offset().bottom);
        target.css("left", this.elem.offset().left);
        target.css("right", this.elem.offset().right);
    },

    search : function(value) {
        this.data = null;
        that = this;
        var jqjson = $.getJSON(this.url + "?query=" + value, function(data){
            console.log(data);
            that.data = data;
        });
        jqjson.complete(function(){
            that.renderSuggestions()
        });
    },

    showBox : function() {
        this.suggestions.show();
    },

    hideBox : function() {
        this.suggestions.hide();
    },

    // will render html for the suggestions' div
    renderSuggestions : function() {
        x = this.suggestions;
        x.html("");
        for(var i = 0; i < this.data.length; i++) {
            // render the category
            x.append("<h4>"+this.data[i].title+"</h4>");
            // render the contents of the category
            this.renderSuggestionsContent(this.data[i].data);
        }
    },

    // will render contents coming from json for one category
    renderSuggestionsContent: function(data) {
        for(var i=0; i< data.length; i++) {
            // claudiu !!    
        }
    }
};

// Check if pre-requisites are met

if((typeof $) !== 'function') {
    throw "You need to include JQuery before this library";
} else {
    
    // if pre-requisites are met -> Create chainable jQuery plug-in:
    console.log("pre-requisites are okay!");

    $.fn.suggest = function(options, args) {
        // console.log(this.first()[0]);
        var s = new Suggest(options.url, $("#"+this.first()[0].id));
        s.search("catalin");
    }
}