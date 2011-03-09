# Twitter Convowall - Project tweets on the big screen for parties talks, conferences, and offices

Convowall is an easy-to-customize, themeable, jQuery-based Twitter conversation wall that can be used to project tweets on a big screen.
This is based on the Twitter walls we run at the (Shorty Awards)[http://shortyawards.com] each year, but generalized to allow for more flexible
options and multiple themes.

# Setting up a wall

In your HTML page, load jQuery and convowall.js.  Add the wall to your page with a call to $.convowall like this:

    $(function() {
            $('body').convowall({
                theme: 'shortyawards',
                interval: 2000,
                search: {
                    q: 'shorty or shortyawards',
                    lang: 'en'
                }
            });
        });

The following options can be used in the call to $.convowall to customize the wall:

* _theme_ - Choose any of the themes from the themes/ directory.
* _interval_ - How long to wait between each call to the Twitter Search API, in microseconds.
* _limit_ - The maximum number of tweets to display on the screen.  Adjust this based on your theme's font size and resultion of your screen.
* _search_ - A hash of search option which are passed to the Twitter search API.  These options include:
    * _q_ - The Twitter search query.  See the [Twitter Search API documentation][http://apiwiki.twitter.com/w/page/22554756/Twitter-Search-API-Method:-search_] for example queries.
    * _lang_ - Limit tweets to a specific language.  Defaults to English ('en').
* _embedly_ - Options for parsing links using [Embedly](https//github.com/embedly/embedly-jquery).  See the Embedly jQuery documentation for available options.  If you want to bypass Embedly, you can set this option to null.


# Themes

Several example themes are included. The Keynote theme is designed to match the look of [http://www.apple.com/iwork/keynote/](Keynote), and has a slot for a custom logo
and rotating messages.  The Photo theme displays several Twitter photo services as Polaroid-style thumbnails.

Each theme is defined using Javascript, CSS, and [Embedded Javascript](http://embeddedjs.com/) templates.  Themes consist of these files:

* _init.js_ - Sets options for the theme and defines Javascript code that is executed when the theme is loaded.
* _theme.css_ - CSS styles for the theme
* _entry.html.ejs_ - The HTML for each entry on the convowall
* _page.html.ejs_ - The HTML for the page or wrapper for the convowall

# Variables available in themes

The theme file entry.html.ejs is the template for each tweet's output.  Many of the variables correspond directly to those provided by  from the Twitter Search API.  The variables include:

* _text_ - text of the tweet
* _text_only_ - text of the tweet with URLs stripped
* _profile_image_url_ - The sender's Twitter avatar image.
* _date_ - a Javascript Date object
* _urls_ - an array containing all URLs found in the tweet text
* _from_user_ - the Twitter username of the tweet's sender
* _id_str_ - string containing tweet id from Twitter Search API
* _oembed_ - am object containing output from [Embedly](https//github.com/embedly/embedly-jquery) or an empty object, if no embeds found.  Currently, only the first link present in the Tweet is passed to Embedly.

        Object {
            provider_url: "http://twitpic.com"
            description: "Out of Libya, Out of London! Saif's mansion in London taken over by a group called Topple the Tyrants."
            title: "Out of Libya, Out of London! Saif's mansion in London taken over by a group called Topple the Tyrants."
            url: "http://twitpic.com/show/full/47u210"
            author_name: "nusibab"
            height: 266
            width: 415
            thumbnail_url: "http://twitpic.com/show/thumb/47u210"
            thumbnail_width: 150
            version: "1.0"
            provider_name: "Twitpic"
            type: "photo"
            thumbnail_height: 150
            author_url: "http://twitpic.com/photos/nusibab"
            code: "<div class="embed"><a href='http://twitpic.com/47u210' target='_blank'><img style='max-width: 250px;max-height: 250px' src='http://twitpic.com/show/full/47u210' alt='Out of Libya, Out of London! Saif's mansion in London taken over by a group called Topple the Tyrants.' /></a></div>"
        }


# Running locally from the filesystem

It is best to run this through a web server, rather than from filesystem (file://) urls locally.  When executing locally from the filesystem, I have noticed "not well formed" errors
when loading JavaScript files through $.getScript in Firefox, most likely because the browser is trying to interpret the Javascript as XML.

Aside from these errors, Convowall does work locally in Firefox, while Chrome has security restrictions which prevent it from running locally.

# Going full screen

In OS X, Firefox 3.6 has an almost-perfect full screen option, but leaves a narrow band of a few pixels at the top.  To solve this problem, get the
(Full Fullscreen)[https://addons.mozilla.org/en-us/firefox/addon/full-fullscreen/] Firefox plugin, and adjust its options so that it hides
browser tabs.  You can then run this in OS X in true full-screen mode.

# Author

[Lee Semel](http://leesemel.com)


