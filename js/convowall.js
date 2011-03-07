
String.prototype.urls = function () {
    return this.match(/http:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g);
};

Convowall = (function($) {

    // Would be nice if AJAX could use .. when run using file:// urls
    
    var scripts = document.getElementsByTagName("script"),
    src = scripts[scripts.length-1].src;
    base = src.substring(0,src.lastIndexOf('/'));

    $.getScript(base+'/lib/jquery.dump.js');
    $.getScript(base+'/lib/ejs.js');
    $.getScript(base+'/lib/view.js');

    Convowall = {
        o: {
            search: {
                q:'#twitter or twitter',
                lang: 'en'
            },
            limit: 10,
            theme: 'keynote',
            theme_path: base + '/../themes',
            interval: 3000
        },

        // The current Javascript timeout
        timeout: null,

        // The jQuery element containing the Convowall
        elem: null,

        init: function(s,elem) {
            this.elem = elem;
            this.o = $.extend(this.o,s);
            if (this.o.theme) {
                this.loadTheme(this.o.theme);
            }
            this.start();
        },

        option: function(k,v) {
            if (typeof k === 'object') {
                this.o = $.extend(this.o,k);
                return this.o;
            } else if (typeof v !== 'undefined') {
                this.o[k] = v;
            }
            return this.o[k];
        },

        start: function() {
            this.o.search.rpp = this.o.limit;
            this.update();
        },

        loadTheme: function(theme) {
            this.loadThemeJS(theme);
            this.loadThemeCSS(theme);
            var url = this.o.theme_path+'/'+this.o.theme+'/page.html.ejs';
            var page = new EJS({
                url: url
            }).render(this.o);
            $('body').append($(page));
           
        },

        loadThemeJS: function(theme) {
            var url = this.o.theme_path+'/'+theme+'/init.js';
            $.getScript(url);
        },

        loadThemeCSS: function(theme) {
            var that = this;
            var url = this.o.theme_path+'/'+theme+'/theme.css';
            $.ajax({
                url: url,
                dataType: 'html',
                success: function(css,textStatus,xhr) {
                    $('<style type="text/css"></style>')
                    .html(css)
                    .appendTo("head");
                },
                error: function(xhr,textStatus,errorThrown) {
                    alert('The url '+ url+' for theme \''+theme+'\' failed to load. Please check that the theme folder exists within '+that.o.theme_path+'.\n\nThe error thrown was:\n '+errorThrown);
                }
            });

           
        },

        update: function() {
            var that = this;
            var elem = this.elem;
            var template = this.o.theme_path+'/'+this.o.theme+'/entry.html.ejs';
           
            var ejs = new EJS({
                url: template
            });

            this.search(this.o.search, function(results) {
                if (!results || results.length == 0) return;
                that.o.search.since_id = results[0].id_str;
                that.o.search.rpp = 1;
                $(elem).find('.entry:gt('+ (that.o.limit-2) + ')').each(function () {
                    $(this).fadeOut('slow')
                });

                $(results.reverse()).each(function(i,result) {

                    // Add extra fields for use by the view
                    var entry_date = new Date(Date.parse(result.created_at));
                    var data = $.extend(result,{
                        date: entry_date,
                        urls: result.text.urls()
                    });
                    var entry = ejs.render(data);
                    var div = $('<div></div>').addClass('entry').html(entry).hide();
                    elem.prepend(div);
                    
                    div.fadeIn('slow');
                    
                });

            });
            timeout = setTimeout(function () {
                that.update();
            }, this.o.interval);
        },

        search: function(o,success) {
            var s = $.extend({
                q:'',
                lang:'en',
                rpp:10,
                since_id:-1
            },o);
            var url = "http://search.twitter.com/search.json?q=" + encodeURIComponent(s.q) + "&lang=" + s.lang + "&rpp=" + s.rpp + "&since_id=" + s.since_id + "&callback=?";
            $.getJSON(url, function(json) {
                if (json && json.results) success(json.results);
            });
           
        }
    };

    $.fn.convowall = function(o) {
        Convowall.init(o,this);
    };

    return Convowall;

})(jQuery);