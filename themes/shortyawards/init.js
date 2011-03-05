$(document).ready(function() {
    var text = ['What people are saying about the Shorty Awards','Send a tweet containing #shortyawards or Shorty Awards to appear here','Check in to TheTimesCenter on Foursquare for a special badge'];
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