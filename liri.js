//»»»»»»»»»»»»»»»»»»»»»»REQUIRE ALL FILES, PACKAGES, AND DEPENDENCIES»»»»»»»»»»»»»»»»»»»»»»

//.env file
require("dotenv").config();

//file system
var fs = require("fs");

//require axios
var axios = require("axios");

//require the keys file for all
var keys = require("./keys.js");

//require bandsInTown
var bandsintown = keys.bandsintown;
//from slack 3/30 :: queryURL = "https://rest.bandsintown.com/artists/" + searchValue + "/events?app_id=codingbootcamp";

//initializing spotify
var Spotify = require(node.spotify.api);
var spotify = new Spotify(keys.spotify);

//require omdb
var omdb = keys.omdb;
var ombdURL = "http://www.omdbapi.com/?t=" + userQuery + "&apikey=omdb" //notsure this will work

//»»»»»»»»»»»»»»»»»»»»»»DECLARE USER COMMAND INPUTS»»»»»»»»»»»»»»»»»»»»»»
var searchType = process.argv[2];
var searchValue = process.argv.slice(3).join(" ");

//»»»»»»»»»»»»»»»»»»»»»»LOGIC FOR USER'S SEARCH TYPE»»»»»»»»»»»»»»»»»»»»»»

switch (
  searchType
  //case 'concert-this': concertThis(); break
  //case 'spotify-this-song': spotifyThis(); break
  //case 'movie-this': movieThis(); break
  //case 'do-what-it-says': doThis(); break
  //default: console.log('I\'m sorry, I don\'t understand')
) {
}

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

/*function spotifyThis() {
    //If no song is provided then your program will default to "The Sign" by Ace of Base

    if(!searchValue) {
        serachValue = "The Sign Ace of Base"
    };
    spotify.search({ //dis from spotify
        type: 'track', 
        query: searchValue,
        limit: 20 //issues?
    }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        } else { //RETURN MUST INCLUDE VALUES
            console.log(Artists) // probably a loop for each < limit.length
            console.log(songTitle)
            console.log(preview link)
            console.log*(albumTitle)
        }
      });
*/

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
