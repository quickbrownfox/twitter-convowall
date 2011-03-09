Convowall.option({
    limit: 50,
    search: {
        q:'celebrity twitpic OR picplz OR yfrog OR tweetphoto'
    },
    embedly: {
        maxWidth: 150,
        maxHeight: 150
    }
})


$(document).ready(function() {
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
        
