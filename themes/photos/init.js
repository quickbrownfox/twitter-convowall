Convowall.option({
    limit: 50,
    search: {
        q:'libya twitpic OR picplz OR yfrog OR instagr.am'
    }
})

$.getScript('js/lib/jquery.embedly.min.js');
$.getScript('js/lib/jquery.livequery.js');

$(document).ready(function() {
    $('a.embedly').livequery(function() {
        var that = this;
        var href = $(this).attr('href');
        $.embedly(href,{
            maxWidth:250,
            maxHeight:250
        },function(oembed,dict) {
            if(oembed.thumbnail_url) {
                var img = $('<img></img>').attr('src',oembed.thumbnail_url).attr('width',oembed.thumbnail_width).attr('height',oembed.thumbnail_height);
                $(that).html($('<span></span>').html(img).append(oembed.description));
            } 
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
        
