# Twitter Convowall - Project tweets on the big screen for parties talks, conferences, and offices

This is an easy-to-customize, themeable, jQuery-based Twitter conversation wall that can be used to project tweets on a big screen.

# Setting up a wall

Clone this repository and edit wall.html.  This file loads all the Javascript and contains a single call to a function that launches the Twitter wall.

The following options can be used in the call to convowall() to customize the wall:

    theme - Choose any of the themes from the themes/ directory.
    interval - How long to wait to pull in each tweet, in microseconds.
    limit - The maximum number of tweets to display on the screen.  Adjust this based on your theme's font size and resultion of your screen.
    search - A hash of search option which are passed to the Twitter search API.  These options include:
        q - The Twitter search query.  See the Twitter Search API for the query format.
        lang - Limit tweets to a specific language.  Defaults to English ('en').

# Running locally


# Themes


# Variables available in themes


# Creating themes




# Author

(Lee Semel)[http://leesemel.com]



