///////////////////////////////////REQUIRES ALL NPM DEPENDENCIES///////////////////////////////////
require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var omdb = require('omdb');
var moment = require('moment');

///////////////////////////////////DECLARE USER COMMAND INPUTS///////////////////////////////////
var searchType = process.argv[2];
var searchValue = process.argv.slice(3).join(" ");

///////////////////////////////////USER COMMAND INPUT EVALS///////////////////////////////////
  //case 'do-what-it-says': doThis(); break
  //default: console.log('I\'m sorry, I don\'t understand')
switch (searchType) {
  //case 'spotify-this-song': spotifyThis(); break
    case 'concert-this':
    concertThis();
    break;
    case 'spotify-this-song':
    spotifyThis();
    break;
    case 'movie-this':
    movieThis();
    break;
    default:
    console.log(`********************************`)
    console.log("\n");
    console.log('I\'m sorry, I don\'t understand');
    console.log("\n");
    console.log(`********************************`)
    break;
}

///////////////////////////////////BANDS RETURN///////////////////////////////////

//notes from api site
//make a call via artists/{artistname}/events
//date string (query) === Can be one of the following values: "upcoming", "past", "all",  If not specified, only upcoming shows are returned
//code 200 = Shows within a date range for the selected artist
//must include venue name, venue location, date of event formatted using moment
//trying a jsonparse 
//datetime*	string($datetime)example: 2017-03-19T11:00:00

function concertThis() {
    request("https://rest.bandsintown.com/artists/" + searchValue + "/events?app_id=codingbootcamp", function(error, response, result)  {
        if (!searchValue) {
            console.log('You searched for nothing! Please try again!')
        } else if (!error && response.statusCode === 200) {
            var searchResult = JSON.parse(result);
            if (searchResult.length > 0) {
                for (i = 0; i < 1; i++) {
                    console.log(`\nSuccess! I have your concert information...\n\nArtist: ${searchResult[i].lineup[0]} \nVenue: ${searchResult[i].venue.name} \nVenue Location: ${searchResult[i].venue.city}, ${searchResult[i].venue.region}, ${searchResult[i].venue.country}`)
                    var eventDate = moment(searchResult[i].datetime).format('MM/DD/YYYY hh:00 A');
                    console.log(`Your event\'s Date and Time is: ${eventDate}\n\n********************************`);
                };
            };

        } else {
            console.log('The event or band cannot be found!');
        };
    });
};

///////////////////////////////////SPOTIFY RETURN///////////////////////////////////
function spotifyThis() {

    if(!searchValue) {
        searchValue = "The Sign"
    };

    spotify.search({
        type: 'track', 
        query: searchValue,
        limit: 1 //limit of the array holding the spotify responses
    }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        var spotifyArr = data.tracks.items;
        for (i = 0; i < spotifyArr.length; i++) {
            console.log(`\nSuccess!...I have your song...\n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n\n********************************`)
        };
    });
}

///////////////////////////////////MOVIE RETURN///////////////////////////////////
function movieThis(){

    if(!searchValue) {
        searchValue = "Mr. Nobody"
        console.log('If you haven\'t watched "Mr. Nobody, " then you should: <http://www.imdb.com/title/tt0485947/>.....it\s on Netflix')
    };
    axios.get("https://www.omdbapi.com/?t=" + searchValue + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
        console.log(`\nSuccess!...I have your movie...\n\nMovie Title: ${response.data.Title} \nYear of Release: ${response.data.Year} \nIMDB Rating: ${response.data.imdbRating} \nRotten Tomatoes Rating: ${response.data.Ratings[1].Value} ${response.data.Year} \nCountry Produced: ${response.data.Country} \nLanguage: ${response.data.Language} \nPlot: ${response.data.Plot} \nActors/Actresses: ${response.data.Actors}\n\n********************************`)
    })
    .catch(function (error) {
        console.log(error);
    });
};

///////////////////////////////////DO THIS FROM 01_ACTIVITIES_12_READFILES///////////////////////////////////
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
