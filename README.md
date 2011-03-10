# Twitter Convowall - Project tweets on the big screen for parties talks, conferences, and offices

Convowall is an easy-to-customize, themeable, jQuery-based Twitter conversation wall that can be used to project tweets on a big screen.
This is based on the Twitter walls we run at the [Shorty Awards](http://shortyawards.com), an awards competition and event that the New York Times has called "The Oscars for Twitter".
It has been generalized to allow for more flexible options and multiple themes.

# Setting up a wall

In yoru HTML page, load jQuery and convowall.js.  Add the wall to your page with a call to $.convowall, like this:

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

* __theme__ - Choose any of the themes from the themes/ directory.
* __interval__ - How long to wait between each call to the Twitter Search API, in milliseconds.
* __limit__ - The maximum number of tweets to display on the screen.  Adjust this based on your theme's font size and resultion of your screen.
* __search__ - A hash of search option which are passed to the Twitter search API.  These options include:
    * __q__ - The Twitter search query.  See the [Twitter Search API documentation](http://apiwiki.twitter.com/w/page/22554756/Twitter-Search-API-Method:-search_) for example queries.
    * __lang__ - Limit tweets to a specific language.  Defaults to English ('en').
* __embedly__ - Options for parsing links using [Embedly](https//github.com/embedly/embedly-jquery).  See the Embedly jQuery documentation for available options.  If you want to bypass Embedly, you can set this option to null.
* __reset__ - Number of minutes after which to reload the page. If you plan on running this for a long time (the length of a whole party) you may want to set this option to automatically refresh the page in case the browser gets stuck due to memory leaks or other problems that may occur when running Javascript over a long period of time.

# Themes

Several example themes are included. The Keynote theme is designed to match the look of [Apple's Keynote application](http://www.apple.com/iwork/keynote/), and has a slot for a custom logo
and rotating messages.  The Photo theme displays several Twitter photo services as Polaroid-style thumbnails.

Each theme is defined using Javascript, CSS, and [Embedded Javascript](http://embeddedjs.com/) templates.  Themes consist of these files:

* __init.js__ - Sets options for the theme and defines Javascript code that is executed when the theme is loaded.
* __theme.css__ - CSS styles for the theme
* __entry.html.ejs__ - The HTML for each entry on the convowall
* __page.html.ejs__ - The HTML for the page or wrapper for the convowall

EJS templates are similar to PHP or ERB templates.  A simple template for an entry might look like this:

    <img src="http://img.tweetimag.es/i/<%= from_user %>_n" width="73" height="73" />
    <p class="text"><%= text %>
    <span class="who"><%= from_user %></span>
    </p>


# Variables available in themes

The theme file entry.html.ejs is the template for each tweet's output.  Many of the variables correspond directly to those provided by  from the Twitter Search API.  The variables include:

* __text__ - text of the tweet
* __text_only__ - text of the tweet with URLs stripped
* __profile_image_url__ - The sender's Twitter avatar image.
* __date__ - a Javascript Date object
* __urls__ - an array containing all URLs found in the tweet text
* __from_user__ - the Twitter username of the tweet's sender
* __id_str__ - string containing tweet id from Twitter Search API
* __oembed__ - am object containing output from [Embedly](https://github.com/embedly/embedly-jquery) or an empty object, if no embeds found.  Only the first link present in the Tweet is passed to Embedly.

    Object {
        provider_url: "http://twitpic.com"
        description: "Tumblr, your failwhale is cute but you seem to go down far too often!"
        title: "Tumblr, your failwhale is cute but you seem to go down far too often!"
        url: "http://twitpic.com/show/full/479qy8"
        author_name: "jeremybrown"
        height: 563
        width: 600
        thumbnail_url: "http://twitpic.com/show/thumb/479qy8"
        thumbnail_width: 150
        version: "1.0"
        provider_name: "Twitpic"
        type: "photo"
        thumbnail_height: 150
        author_url: "http://twitpic.com/photos/jeremybrown"
        code: "<div class="embed"><a href='http://twitpic.com/479qy8' target='_blank'><img style='max-width: 200px;max-height: 200px' src='http://twitpic.com/show/full/479qy8' alt='Tumblr, your failwhale is cute but you seem to go down far too often!' /></a></div>"
    }


# Running locally from the filesystem

It is best to run this through a web server, rather than from filesystem (file://) urls locally.  When executing locally from the filesystem, I have noticed "not well formed" errors
when loading JavaScript files through $.getScript in Firefox, most likely because the browser is trying to interpret the Javascript as XML.

Aside from these errors, Convowall does work locally in Firefox, while Chrome has security restrictions which prevent it from running locally.

# Going full screen

In OS X, Firefox 3.6 has an almost-perfect full screen option, but leaves a narrow band of a few pixels at the top.  To solve this problem, get the
[Full Fullscreen](http://addons.mozilla.org/en-us/firefox/addon/full-fullscreen/) Firefox plugin, and adjust its options so that it hides
browser tabs.  You can then run this in OS X in true full-screen mode.

# Notes

Due to how Twitter search works, not all tweets are guaranteed to display.

# Author

[Lee Semel](http://leesemel.com), ['hello','@','leesemel','.','com'].join('')

