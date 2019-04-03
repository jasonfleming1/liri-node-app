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
function searchLiri (searchType, searchValue) {
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
        case 'do-what-it-says':
        doThis(searchValue);
        break;
        default:
        console.log(`\n\n********************************\n\nI'm Sorry! I do not understand\n\n********************************\n`)
        break;
    };
}

searchLiri(searchType, searchValue);
//////////////////////////////////BANDS RETURN///////////////////////////////////

////Tried axios, made it work with json parse
/* another axios tryfunction concertThis() {
    axios.get("https://rest.bandsintown.com/artists/" + searchValue + "/events?app_id=codingbootcamp")
    .then(function(response) {
        if (response.length > 0) {
            for (i = 0; i < 1; i++) {
                console.log(`\n********************************\n\nSuccess! Here is the Artist's next concert information...\n\nYour Artist: ${response[i].lineup} \nLineup: ${response[i].lineup} \nVenue: ${response[i].venue.name} \nVenue Location: ${response[i].venue.city}, ${response[i].venue.region} ${searchResult[i].venue.country}`)
                var eventDate = moment(response[i].datetime).format('MM/DD/YYYY hh:00 A');
                console.log(`Your event\'s Date and Time is: ${eventDate}\n\n********************************\n`);
            }
        }
    })
    .catch(function (error) {
        console.log(error);
    });
};*/

function concertThis() {
    request("https://rest.bandsintown.com/artists/" + searchValue + "/events?app_id=codingbootcamp", function(error, response, result)  {

        if (!searchValue) {
            console.log('Your search did not include an Artist...please try again!')
        }
        else if (!error && response.statusCode == 200) {
            //console.log(result) doing this shows you the reply for a date-less search
            var searchResult = JSON.parse(result);
            //console.log(searchResult);
            if (searchResult.length > 0) {
                for (i = 0; i < 1; i++) {
                    console.log(`\n********************************\n\nSuccess! Here is the Artist's next concert information...\n\nYour Artist: ${searchResult[i].lineup[0]} \nLineup: ${searchResult[i].lineup} \nVenue: ${searchResult[i].venue.name} \nVenue Location: ${searchResult[i].venue.city}, ${searchResult[i].venue.region} ${searchResult[i].venue.country}`)
                    var eventDate = moment(searchResult[i].datetime).format('MM/DD/YYYY hh:00 A');
                    console.log(`Your event\'s Date and Time is: ${eventDate}\n\n********************************\n`);
                }
                fs.appendFile("log.txt", (`\n********************************\n\nSuccess! Here is the Artist's next concert information...\n\nYour Artist: ${searchResult[i].lineup[0]} \nLineup: ${searchResult[i].lineup} \nVenue: ${searchResult[i].venue.name} \nVenue Location: ${searchResult[i].venue.city}, ${searchResult[i].venue.region} ${searchResult[i].venue.country} \nYour event\'s Date and Time is: ${eventDate}\n\n********************************\n`), function(err) {
                    if (err) {
                        console.log(err);
                } else {
                     console.log(`\nSuccessfully Logged!\n`);
                };
            })}
                else {
                    console.log('This Artist is not currently touring. Please try another search!')
                };
        } 
        
        else {
            console.log('Something happened! We could not find the artist you are looking for!')
        };
    });
};
        
///////////////////////////////////SPOTIFY RETURN///////////////////////////////////
function spotifyThis() {

    if(!searchValue) {
        searchValue = "The Sign by Ace of Base"
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
            console.log(`\n\n********************************\n\nSuccess! Here is the song information from Spotify...\n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n\n********************************\n`)
        };
        for (i = 0; i < spotifyArr.length; i++) {
            fs.appendFile("log.txt", (`\n\n********************************\n\nSuccess! Here is the song information from Spotify...\n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n\n********************************\n`), function(err) {
            if (err) {
                console.log(err);
        } else {
             console.log(`\nSuccessfully Logged!\n`);
        };
        })};
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
        console.log(`\n\n********************************\n\nSuccess! Here is your movie information...\n\nMovie Title: ${response.data.Title} \nYear of Release: ${response.data.Year} \nIMDB Rating: ${response.data.imdbRating} \nRotten Tomatoes Rating: ${response.data.Ratings[0].Value} \nCountry Produced: ${response.data.Country} \nLanguage(s): ${response.data.Language} \nPlot: ${response.data.Plot} \nActor(s)/Actress(es): ${response.data.Actors}\n\n********************************\n`);

        fs.appendFile("log.txt", (`\n\n********************************\n\nSuccess! Here is your movie information...\n\nMovie Title: ${response.data.Title} \nYear of Release: ${response.data.Year} \nIMDB Rating: ${response.data.imdbRating} \nRotten Tomatoes Rating: ${response.data.Ratings[0].Value} \nCountry Produced: ${response.data.Country} \nLanguage(s): ${response.data.Language} \nPlot: ${response.data.Plot} \nActor(s)/Actress(es): ${response.data.Actors}\n\n********************************\n`), function(err) {
            if (err) {
                console.log(err);
        } else {
             console.log(`\nSuccessfully Logged!\n`);
        };
    });
    })
    .catch(function (error) {
        console.log(error);
    });
};

///////////////////////////////////DO THIS FROM 01_ACTIVITIES_12_READFILES///////////////////////////////////
function doThis() {
    fs.readFile("./random.txt", 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        var randomSearch = data.split(",");
        searchType = randomSearch[0];
        searchValue = randomSearch[1];
        searchLiri(searchType, searchValue);
    });
};

