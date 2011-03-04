jQuery.fn.reverse = Array.prototype.reverse;
String.prototype.linkify = function () {
    return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g, function (m) {
        return m.link(m);
    });
};
String.prototype.linkuser = function () {
    return this.replace(/[@]+[A-Za-z0-9-_]+/g, function (u) {
        var username = u.replace("@", "")
        return u.link("http://twitter.com/" + username);
    });
};
String.prototype.linktag = function () {
    return this.replace(/[#]+[A-Za-z0-9-_]+/, function (t) {
        var tag = t.replace("#", "%23")
        return t.link("http://search.twitter.com/search?q=" + tag);
    });
};



Convowall = (function($) {


    Convowall = {
        o: {
            search: {},
            limit: 6,
            theme: 'shorty',
            theme_path: window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')),
            interval: 2000,
            theme_elements: {
                page: '',
                entry: ''
            }
        },
        
        init: function(s) {
            this.o = $.extend(this.o,s);
            if (this.o.theme) {
                this.loadTheme(this.o.theme);
            }
            this.start();
        },
        
        start: function() {
            this.update();
        },

        loadTheme: function(theme) {
            var that = this;
            this.loadThemeCSS(theme);
            $.each(['page','entry'],function(i,file) {
                that.loadThemeFile(theme,file);
            });
            
        },

        loadThemeFile: function(theme,file) {
            var that = this;
            var url = this.o.theme_path+'/themes/'+theme+'/'+file+'.html.ejs';
            $.get(url,{},function(responseText,textStatus) {
                if (textStatus == 'success') {
                    that.o.theme_elements[file] = responseText;
                } else {
                    throw('Could not load file ' + url);
                }
            },'html');
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
            var elem = $('#cw_content');
            this.search(this.o.search, function(results) {
                if (!results || results.length == 0) return;
                that.o.search.since_id = results[0].id_str;
                that.o.search.rpp = 1;
                $(elem).find('.entry:gt('+ (that.o.limit-2) + ')').each(function () {
                    $(this).fadeOut('slow')
                });

                $(results.reverse()).each(function(i,result) {
                    var div = $('<div></div>').addClass('entry').html(result.text).hide();
                    elem.prepend(div);
                    div.fadeIn('slow');
                    var entry_date = new Date(Date.parse(result.created_at));
                    var vars = $.extend(result,{
                       date: entry_date,
                       date_str: entry_date.getHourse() + ':' + entry_date.getMinutes(),
                    });
                    
                });

            });
            setTimeout(function () {
                that.update();
            }, this.o.interval);
        },

        search: function(o,success) {
            var s = $.extend({
                q:'twitter',
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

    $.fn.convowall = function(elem,o) {
        Convowall.init(o);
    };

    return Convowall;

})(jQuery);