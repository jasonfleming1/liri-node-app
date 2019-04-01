///////////////////////////////////REQUIRES ALL NPM DEPENDENCIES///////////////////////////////////
require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var omdb = require('omdb');
//var omdb = new Omdb(keys.omdb);
//var ombdURL = "http://www.omdbapi.com/?t=" + userQuery + (keys.omdb); //notsure this will work

//require bandsInTown
//var bandsintown = keys.bandsintown;
//from slack 3/30 :: queryURL = "https://rest.bandsintown.com/artists/" + searchValue + "/events?app_id=codingbootcamp";


///////////////////////////////////DECLAR USER COMMAND INPUTS///////////////////////////////////
var searchType = process.argv[2];
var searchValue = process.argv.slice(3).join(" ");

///////////////////////////////////USER COMMAND INPUT EVALS///////////////////////////////////
  //case 'concert-this': concertThis(); break
  //case 'movie-this': movieThis(); break
  //case 'do-what-it-says': doThis(); break
  //default: console.log('I\'m sorry, I don\'t understand')
switch (searchType) {
  //case 'spotify-this-song': spotifyThis(); break
    case 'spotify-this-song':
    spotifyThis();
    break;
    case 'movie-this':
    movieThis();
    break;
    default:
    console.log(`***********************************************`)
    console.log("\r\n\r\n\r\n");
    console.log('I\'m sorry, I don\'t understand');
    console.log("\r\n\r\n\r\n");
    console.log(`***********************************************`)
    break;
}

///////////////////////////////////BANDS RETURN///////////////////////////////////
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

///////////////////////////////////SPOTIFY RETURN///////////////////////////////////
function spotifyThis() {

    if(!searchValue) {
        searchValue = "The Sign Ace of Base"
    };

    spotify.search({
        type: 'track', 
        query: searchValue,
        limit: 15
    }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        var spotifyArr = data.tracks.items;
        for (i = 0; i < spotifyArr.length; i++) {
            console.log(`\nSuccess!...\n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n\n ****************`)
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
        console.log(`\n\n****************\nSuccess!...\n\nMovie Title: ${response.data.Title} \nYear of Release: ${response.data.Year} \nIMDB Rating: ${response.data.imdbRating} \nRotten Tomatoes Rating: ${response.data.Ratings[1].Value} ${response.data.Year} \nCountry Produced: ${response.data.Country} \nLanguage: ${response.data.Language} \nPlot: ${response.data.Plot} \nActors/Actresses: ${response.data.Actors} \n\n*****************`)
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
