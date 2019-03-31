//»»»»»»»»»»»»»»»»»»»»»»REQUIRE ALL FILES, PACKAGES, AND DEPENDENCIES»»»»»»»»»»»»»»»»»»»»»»

require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//require bandsInTown
//var bandsintown = keys.bandsintown;
//from slack 3/30 :: queryURL = "https://rest.bandsintown.com/artists/" + searchValue + "/events?app_id=codingbootcamp";
//require omdb
//var omdb = keys.omdb;
//var ombdURL = "http://www.omdbapi.com/?t=" + userQuery + "&apikey=omdb" //notsure this will work

//»»»»»»»»»»»»»»»»»»»»»»DECLARE USER COMMAND INPUTS»»»»»»»»»»»»»»»»»»»»»»
var searchType = process.argv[2];
var searchValue = process.argv.slice(3).join(" ");

//»»»»»»»»»»»»»»»»»»»»»»LOGIC FOR USER'S SEARCH TYPE»»»»»»»»»»»»»»»»»»»»»»
  //case 'concert-this': concertThis(); break
  //case 'movie-this': movieThis(); break
  //case 'do-what-it-says': doThis(); break
  //default: console.log('I\'m sorry, I don\'t understand')
switch (searchType) {
  //case 'spotify-this-song': spotifyThis(); break
    case 'spotify-this-song':
    spotifyThis();
    break;
    default:
    console.log(`***********************************************`)
    console.log("\r\n\r\n\r\n");
    console.log('I\'m sorry, I don\'t understand');
    console.log("\r\n\r\n\r\n");
    console.log(`***********************************************`)
    break;
}

//»»»»»»»»»»»»»»»»»»»»»»TAKING USER SEARCH VALUES»»»»»»»»»»»»»»»»»»»»»»



//»»»»»»»»»»»»»»»»»»»»»»RETURN FUNCTIONS»»»»»»»»»»»»»»»»»»»»»»

//bands in town and moment super psuedo prep

/*function concertThis() {
    //request(queryURL with serachValue, function(error, response))
    //if = (!error) {
        format the api response & MUST INCLUDE:
        1. venue name
        2. venue location
        3. Date of event formatted moment.MM/DD/YYYY
    } else {
        console.log('The event or band cannot be found!')
    }
}*/

//spotify return (directly from spotify psuedo)
    //If no song is provided then your program will default to "The Sign" by Ace of Base
function spotifyThis() {

    if(!searchValue) {
        serachValue = "The Sign Ace of Base"
    };

    spotify.search({
        type: 'track', 
        query: searchValue,
        limit: 2 //issues?
    }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        var spotifyArr = data.tracks.items;
        for (i = 0; i < spotifyArr.length; i++) {
            console.log(`\nSuccess!...\n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n\n - - - - -`)
        };
    });
}

//omdb psueper psuedo

/*function movieThis(){

    //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

    if(!searchValue) {
        serachValue = "Mr. Nobody"
    };

    axios.get(ombdURL).then //notsure i can do this
        (function(response) {
            Title: console.log("The movie's rating is: " + response.data.title);
            Year: console.log("The movie's rating is: " + response.data.year);
            IMDB Rating: console.log("The movie's rating is: " + response.data.imdbRating);
            RottenToms: console.log("The movie's rating is: " + response.data.rottenRating);
            Produced Country: console.log("The movie's rating is: " + response.data.country);
            Language: console.log("The movie's rating is: " + response.data.language);
            Plot: console.log(response.data.plot);
            Actors: console.log(response.data.actors);
    });
};
*/

//doThis from read.js 01 activites, 12 - ReadFile

/*function doThis() {
    //fs.readFile("random.txt", "utf8", function(err, data){
        if(err) {
            console.log("error")
        } else {
            console.log('random.txt);
            var song = data.split(",");
            spotifyThis(song);
            console.log(spotifyThis);
        }
    }
}
*/
