var Suggest = function(url, elem) {
    this.url = url;
    this.elem = elem;
    that = this;
    this.data = null;
    this.suggestions = null;

    this.searchValue = null;

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
    
    //closing the suggestion box if escape is pressed
    that = this;
    $(document).keyup(function(e) {
      if (e.keyCode == 27) { // escape 
        that.hideBox();
      }
    });

    window.onresize = function() {
        that.setPosition($(".suggestions"));
    }

    this.init();
}

Suggest.prototype = {

    init : function() {
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
        target.css("min-height", "50px");
        target.css("background-color", "rgba(255, 255, 255, 1)");
        target.css("box-shadow", "0px 0px 8px rgba(0,0,0,0.3)");
        target.css("margin-top", "3px");
        target.css("overflow", "hidden");
        target.css("padding","1%");
        target.css("z-index", "9999");
        this.elem.attr("autocomplete","off");

        this.setPosition(target);
    },

    setPosition : function(target) {
        //position straight below the form
        target.css("top", this.elem.offset().top + this.elem.outerHeight());
        // console.log(this.elem);
        target.css("left", this.elem.offset().left);
        target.css("right", this.elem.offset().right);
        
        target.css("max-height", window.innerHeight * 0.5);
        target.css("width", this.elem.outerWidth());

    },

    // will create a hover effect for the .suggestion h5's
    hoverStyle : function() {
        s = $(".suggestion");
        s.css("border-radius","3px");
        s.css("padding","2%");
        s.hover(function(){
            $(this).css("background-color","lightgrey");
            $(this).css("cursor", "pointer");
        }, function(){
            $(this).css("background-color","white");
            $(this).css("cursor", "auto");
        });
        that = this;
        s.click(function(){
            suggestion = $(this).find("h5").text();
            // console.log(typeof suggestion);
            that.elem.val(suggestion);
        });
    },

    // performs the api GET request to get the suggestions
    search : function(value) {
        this.data = null;
        this.searchValue = value;
        that = this;
        var jqjson = $.getJSON(this.url + "?query=" + value, function(data){
            that.data = data;
        });
        jqjson.complete(function(){
            // console.log(that.data)
            if ( (typeof that.data != "undefined") && (that.data.length > 0) ) {
                that.renderSuggestions()
            } else {
                x = that.suggestions;
                x.html("<h4>No results matching the search..</h4>");
            }
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
            x.append("<h4 style='padding:0;margin:0;'>"+this.data[i].title+"</h4>");
            // render the contents of the category
            this.renderSuggestionsContent(this.data[i].data, i);
        }
        this.hoverStyle();
    },

    // wrap matched substring in string with bold tags
    emphasise: function(string) {
        s = this.searchValue;
        s2 = s;
        s2 = s2[0].toUpperCase() + s2.substring(1,s2.length)
        ret = string.replace(s,"<b>"+s+"</b>");
        ret = ret.replace(s2, "<b>"+s2+"</b>");
        return ret;
    },

    // will render contents coming from json for one category
    renderSuggestionsContent: function(data, count) {
        x = this.suggestions;
        x.append("<div class='category container-fluid' id='"+count+"'>");
        for(var i=0; i< data.length; i++) {
            aux = ("<div class='suggestion row' id='"+i+"'>");
                aux += ("<div class='col-md-3 col-xs-3'><img src='"+data[i].url+"' style='height:50px; width:50px;'></img></div>");
                aux += "<div class='col-md-9 col-xs-9'>";
                    aux += "<div class='row'><h5 style='padding:0;margin:0;'>"+this.emphasise(data[i].name)+"</h5></div>";
                    aux += "<div class='row' style='color:grey;'>"+data[i].description+"</div>";
                aux += "</div>";
            aux += ("</div>");

            x.append(aux);
        }
        x.append("</div>");
    }
};

// Check if pre-requisites are met

if( (typeof $) !== 'function') {
    throw "You need to include JQuery before this library";
} else {
    
    // if pre-requisites are met -> Create chainable jQuery plug-in:
    // console.log("pre-requisites are okay!");

    $.fn.suggest = function(options, args) {
        var s = new Suggest(options.url, $("#"+this.first()[0].id));
    }
}