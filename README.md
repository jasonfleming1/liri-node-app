# Liri Node App
---
- **Developer:** Jason Fleming
- **Deployment Date** April 3, 2019
- **Built With** Node.js, Javascript, Axios NPM
- **APIs** Bandsintown, OMDB, Spotify

### Description & Requirements
---
Liri is a command line application that takes user commands and queries from the command line and returns data from API's. The following commands have been hard coded into the program to give the user the capability to look up songs, concerts and movie information:

Commands | Function
---------|---------
concert-this | uses the **bandsintown** API to take a band name from the user and returns that bands next concert and the entire lineup for the show
spotify-this-song | uses the **spotify** API to take a song name from the user and returns song and artist details
movie-this | uses the **OMDB** API and **Axios** to take a movie name and returns details about the movie, cast, and ratings information
do-this | uses the built in **readFile()** method to access data from a prepopulated .txt file and return its information with a default user query

**Before you get started, make sure you have these node packages installed:**
1. **Dotenv:** Dotenv is a zero-dependency module that loads environment variables from a .env file
2. **Axios:** - Axios was suggested for getting OMDB and Bandsintown responses. I used "response" with the Bandsintown because Axios didn't work with what I was trying to retrieve
3. **Moment:** - A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates. 
4. **Fs:** - a node package for accessing file system files.

### Functionality
--- 
1. searchLiri

    *<searchType, searchValue>*

    Function is a switch statement to identify the searchType the user is trying to perform. Each case calls a specific function that takes in the searchValue and performs the API query.
--- 
2. concert-this 

    *<searchValue, artist name>*

    Function takes the search type value (searchType) and search's on (artist), and returns the next concert time and date for that artist, as well as location and city.

    ![image of concert-his](/assets/concertThis_success.png)
    ![image of concert-this](/assets/concertThis_notTouring.png)
--- 
3. spotify-this

     *<searchValue, song name>*

    Function takes the search type value (searchType) and search's on (song), and returns the artist, full track name, a preview link and the album.

    ![image of spotify-this](/assets/spotifyThisSong_success.png)
    ![image of spotify-this2](/assets/spotifyThisSong_nullSong.png)
--- 
4. movie-this
  *<searchValue, movie name>*

    Function takes the search type value (command) and search's on (movie title), and returns title, cast, release date, ratings, country of origin, original language and synopsis.
    ![image of movie-this](/assets/movieThis_Success.png)
    ![image of movie-this2](/assets/movieThis_nullMovie.png)
    ![image of movie-this3](/assets/movieThis_catchError.png)
--- 
5. do-this

      *<searchValue>*

    This function retrieves searchType and searchValue information from the random.txt file. I only left the default spotify-this-song and find the backstreet boy's i want it my way song.

    ![image of do-this](/assets/doWhatItSays_liriSearch.png)
