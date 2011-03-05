


Convowall = (function($) {


    Convowall = {
        o: {
            search: {
                q:'#twitter or twitter',
                lang: 'en'
            },
            limit: 10,
            theme: 'shorty',
            theme_path: window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')),
            interval: 3000,
        },

        timeout: null,
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
            var url =this.o.theme_path+'/themes/'+this.o.theme+'/page.html.ejs';
            var page = new EJS({
                url: url
            }).render(this.o);
            $('body').append($(page));
           
        },

        loadThemeJS: function(theme) {
            var url = this.o.theme_path+'/themes/'+theme+'/init.js';
            $.getScript(url);
        },

        loadThemeCSS: function(theme) {
            var url = this.o.theme_path+'/themes/'+theme+'/theme.css';
            $.get(url, function(css) {

                $('<style type="text/css"></style>')
                .html(css)
                .appendTo("head");
            },'html');
        },

        update: function() {
            var that = this;
            var elem = this.elem;
            var template = this.o.theme_path+'/themes/'+this.o.theme+'/entry.html.ejs';
           
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
                  
                    var entry_date = new Date(Date.parse(result.created_at));
                    var data = $.extend(result,{
                        date: entry_date,
                    });
                  
                    var entry = ejs.render(data);
                    var div = $('<div></div>').addClass('entry').html(entry).hide();
                    elem.prepend(div);
                    
                    div.fadeIn('slow');
                    
                });

            });
            setTimeout(function () {
                that.update();
            }, this.o.interval);
        },

        search: function(o,success) {
            var s = $.extend({
                q:'',
                lang:'en',
                rpp:10,
                since_id:-1,
            },o);
            var url = "http://search.twitter.com/search.json?q=" + s.q + "&lang=" + s.lang + "&rpp=" + s.rpp + "&since_id=" + s.since_id + "&callback=?";
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