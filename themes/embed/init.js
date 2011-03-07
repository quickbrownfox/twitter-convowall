Convowall.option({
    limit: 50,
    search: {
        q:'twitpic OR picplz OR yfrog OR tweetphoto'
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
            $(that).html(oembed.code);
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

