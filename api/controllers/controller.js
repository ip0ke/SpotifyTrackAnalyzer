var SpotifyWebApi = require('spotify-web-api-node');
var mongoose = require('mongoose'),
    SpotifyTrackRecord = mongoose.model('SpotifyTrackRecords');

var credentials = {
    clientId: '2844a894b43f4622b7bff4540ad71d6d',
    clientSecret: '1b5e7e8434784485905839e96d5b2e74',
    redirectUri: 'http://localhost:8888/auth-callback'
};

var spotifyApi = new SpotifyWebApi(credentials);

exports.authorize = function (req, res) {
    
    
    var scopes = ['user-read-private', 'user-read-email', 'user-top-read', 'user-read-recently-played'],
        redirectUri = 'http://localhost:8888/auth-callback',
        clientId = '2844a894b43f4622b7bff4540ad71d6d',
        state = '200';

    // Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
    var spotifyApi = new SpotifyWebApi({
        redirectUri: redirectUri,
        clientId: clientId
    });

    // Create the authorization URL
    var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
    
    res.redirect(authorizeURL);
    res.end();
};

exports.authorized = function(req,res){
    
    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(req.query.code)
        .then(function (data) {
            console.log('The token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);
            console.log('The refresh token is ' + data.body['refresh_token']);

            // Set the access token on the API object to use it in later calls
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.setRefreshToken(data.body['refresh_token']);
            res.end();
            
        }, function (err) {
            console.log('Something went wrong!', err);
        });
};

exports.elvis = function(req,res){
    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
        .then(function (data) {
            console.log('Artist albums', data.body);
            res.send(data.body);
        }, function(err) {
            console.log('Elivs is dead.');
            res.end();
        });
};

exports.getTracksFromSpotify = function(req, res){
    spotifyApi.getMyRecentlyPlayedTracks()
        .then(function (data) { 
            var json = data.body;
            for (var i = 0; i < json.items.length; i++) { 
                
                var new_SpotifyTrackRecord = new SpotifyTrackRecord({
                    trackid: json.items[i].track.id,
                    trackname: json.items[i].track.name,
                    trackduration: json.items[i].track.duration_ms,
                    artistid: json.items[i].track.artists[0].id,
                    artistname: json.items[i].track.artists[0].name,
                    playedat: json.items[i].played_at
                })
                
                new_SpotifyTrackRecord.save(function(err, track) {
                    if (err)
                      res.send(err);
                });
            }
            res.end();
        }, function(err) {
            console.log(err);
            res.end();
        });
};

exports.refreshToken = function(req, res){
    spotifyApi.refreshAccessToken()
        .then(function(data) {
            console.log('The access token has been refreshed!');
            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);
        }, function(err) {
            console.log('Could not refresh access token', err);
        });

};



