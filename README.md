# LIRI_Bot

a node.js app

to use, navigate to containing directory from the command line
then, input the following into the command line:
   "node liri.js {command} {argument (optional)}"

{command} can be one of the following:
   "my-tweets"
        - returns tweets for username in variable "params"
   "spotify-this-song"
        - receives optional {argument} song name or uses a default song
        - returns song information from Spotify
   "movie-this"
        - receives optional {argument} movie name
        - returns song information from Internet Movie Database
   "do-what-it-says"
        - enters commands from the "random.txt" file

log of commands entered will be stored in "log.txt"