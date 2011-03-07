Convowall.option({
    search: {
        q:'bieber twitpic'
    }
})

$.getScript('js/lib/jquery.embedly.min.js');
$.getScript('js/lib/jquery.livequery.js');

$(document).ready(function() {
    $('a.embedly').livequery(function() {
        var that = this;
        var href = $(this).attr('href');
        $.embedly(href,{maxWidth:250,maxHeight:250},function(oembed,dict) {
            // url, width, height description, thumbnail_url
            var img = $('<img></img>').attr('src',oembed.thumbnail_url).attr('width',oembed.thumbnail_width).attr('height',oembed.thumbnail_height);
            $(that).html(img);
        });
    });
    var text = ['This is the Photo theme for Convowall','Edit the theme to change this rotating text, the Twitter search query, and to insert your logo'];
    $('#logo-text').text(text[0]).fadeIn('slow');
    var index = 0;
    setInterval(function() {
        $('#logo-text').fadeOut('slow',function() {
            index = (1+index)%text.length;
            $('#logo-text').text(text[index]);
            $('#logo-text').fadeIn('slow')
        })
    },5000);
});
        
