
String.prototype.urls = function () {
    return this.match(/http:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g);
};


Convowall = (function($) {

    // Would be nice if AJAX could use .. when run using file:// urls

    var scripts = document.getElementsByTagName("script"),
    src = scripts[scripts.length-1].src;
    base = src.substring(0,src.lastIndexOf('/'));

    $.getScript(base+'/lib/jquery.dump.js');
    $.getScript(base+'/lib/view.js');
    $.getScript(base+'/lib/jquery.embedly.min.js');


    Convowall = {
        o: {
            search: {
                q:'#twitter or twitter',
                lang: 'en',
                refresh_url: null,
                since_id: -1
            },
            limit: 10,
            theme: 'keynote',
            theme_path: base + '/../themes',
            interval: 3000,
            embedly: {
                maxWidth: 250,
                maxHeight: 250
            },
            reset: null
        },

        // The current Javascript timeout
        timeout: null,

        // The jQuery element containing the Convowall
        elem: null,

        init: function(s,elem) {
            var that = this;
            this.elem = elem;
            this.o = $.extend(this.o,s);
            $.getScript(base+'/lib/ejs.js',function() {
                if (that.o.theme) {
                    that.loadTheme(that.o.theme);
                }
                that.start();
            });
            
            if (this.o.reset) {
                setTimeout(function() {
                    window.location.reload();
                }, this.o.reset);
            }
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
            if(this.timeout) clearTimeout(this.timeout);
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

            var template = that.o.theme_path+'/'+that.o.theme+'/entry.html.ejs';
           
            function hideEntries() {
                $(elem).find('.entry:gt('+ (that.o.limit-2) + ')').each(function () {
                    $(this).fadeOut('slow')
                });

            };

            function showEntry(data) {
                var ejs = new EJS({
                    url: template
                });
              
                var div = $('<div></div>').addClass('entry').html(ejs.render(data)).hide();
             
                elem.prepend(div);
                div.fadeIn('slow');
            };

            function processEmbeds(data, complete) {
                data.oembed = {};
                if (data.urls && data.urls.length > 0) {
                    var opts = that.o.embedly;
                    opts.success = function(oembed,dict) {
                        if (oembed) {
                            data.oembed = oembed;
                            complete(data);
                        }
                    };
                    var url = data.urls[0];
                    if (url.match(window.embedlyURLre)) {
                        $.embedly(url,opts);
                        return;
                    }
                }
                complete(data);
            };

            this.search(this.o.search, function(json) {

                if (!json || !json.results || json.results.length == 0) return;

                that.o.search.rpp = 1;
                
                hideEntries();

                that.o.search.since_id = json.results[0].id_str;

                $(json.results).each(function(i,result) {
                    // Add extra fields for use by the view
                    var entry_date = new Date(Date.parse(result.created_at));
                    var data = $.extend(result,{
                        date: entry_date,
                        urls: result.text.urls(),
                        text_only: result.text.replace(/http:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g,''),
                        oembed: {}
                    });

                    that.o.embedly ? processEmbeds(data,showEntry) : showEntry(data);


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
                since_id:-1,
                refresh_url:null
            },o);
          
            var url = "http://search.twitter.com/search.json";
         
            if (s.refresh_url) {
                url += s.refresh_url + '&lang=' + s.lang + '&rpp=' + s.rpp + '&callback=?';
            } else {
                url += "?result_type=recent&q=" + encodeURIComponent(s.q) + "&lang=" + s.lang + "&rpp=" + s.rpp + "&since_id=" + s.since_id + "&callback=?";
            }
         
            $.getJSON(url, function(json) {
                if (json && json.results) success(json);
            });

        }
    };

    $.fn.convowall = function(o) {
        Convowall.init(o,this);
    };

    return Convowall;

})(jQuery);