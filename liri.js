require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var argument = process.argv[3];

execute(command, argument);

function execute(command, argument) {

	console.log('executing command {' + command
		+  '} on argument {' + argument + '}');

	if (command === 'my-tweets') {
		myTweets();

	} else if (command === 'spotify-this-song') {

		if (argument) {
			argument = argument.replace(/(^")|("$)/g, '');
			spotifySong(argument);

		} else {
			spotifySong('The Sign Ace of Base');
		}

	} else if (command === 'movie-this') {

		if (argument) {
			argument = argument.replace(/(^")|("$)/g, '');
			movieThis(argument);

		} else {
			movieThis('Mr. Nobody');
		}

	} else if (command === 'do-what-it-says') {
		fs.readFile("random.txt", "utf8", function(error, data) {

			if (error) {
	    		return console.log('Error occurred: ' + error);
			}

			var dataArr = data.split(",");

			command = dataArr[0];
			argument = dataArr[1];

			execute(command, argument);
		});

	} else {
		console.log('Error: Invalid command input');
	}
}

function myTweets() {
	var params = {screen_name: 'nadevtest', count: 20};

	console.log('getting tweets from username {' + params.screen_name + '}');

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
   		if (error) {
   			return console.log('Error offurred: ' + error);
   		}

		var tweetArray = [];

		for (var i = 0; i < tweets.length; i++ ) {

			tweetArray.push({
				date: tweets[i].created_at,
				text: tweets[i].text,
			});
		}

		console.log('Twitter Results: ')
		console.log(tweetArray);
	});

}

function spotifySong(searchString) {
	console.log('getting song info on {' + searchString + '}');
	var params = { type: 'track', query: searchString, limit: 1 };

	spotify.search(params, function(error, data) {

		if (error) {
	    	return console.log('Error occurred: ' + error);
		}

		var topResult = data.tracks.items[0];

		var songInfo = {
			artist: topResult.artists[0].name,
			songName: topResult.name,
			link: topResult.preview_url,
			albumName: topResult.album.name,
		};

		console.log('Top Spotify Result:')
		console.log(songInfo);
	});
}

function movieThis(movieName) {
	console.log('getting movie info on {' + movieName +'}');

}