exports.authorize = function (req, res) {
    var SpotifyWebApi = require('spotify-web-api-node');
    
    /*var scopes = ['user-read-private', 'user-read-email'],
        redirectUri = 'http://localhost:3000/auth-callback',
        clientId = '2844a894b43f4622b7bff4540ad71d6d',
        state = '200';

    // Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
    var spotifyApi = new SpotifyWebApi({
        redirectUri: redirectUri,
        clientId: clientId
    });

    // Create the authorization URL
    var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

    console.log(authorizeURL);
    */
    
    var credentials = {
        clientId: '2844a894b43f4622b7bff4540ad71d6d',
        clientSecret: '1b5e7e8434784485905839e96d5b2e74',
        redirectUri: 'http://localhost:3000/auth-callback'
    };

    var spotifyApi = new SpotifyWebApi(credentials);

    // The code that's returned as a query parameter to the redirect URI
    var code = 'AQCAXEHCZT3Dnp4NPcwrEy1MtUGZOCN82HyKvtrqUnsa0qYcLlaMYBJAuUTzt0DQFYQQ2DjF7P8UirIhO_V9SwqsQ3R42kc4-ZQNwk0Bp6R4bIk1lIjBdu_Jr-8ntyg1QhaAWNMDGROXGEjIR5bxvYg7OP7OCsEF_3Wx9TDgvy2Hzy3du6JDgDW0Rst-M7xrvPP-97TvYzGbcLaDwecVi9qAGMHdbuQZmcnzZAaUOdKgp3iFGO0nGjP_nYwA';

    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code)
        .then(function (data) {
            console.log('The token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);
            console.log('The refresh token is ' + data.body['refresh_token']);

            // Set the access token on the API object to use it in later calls
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.setRefreshToken(data.body['refresh_token']);

            spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
                .then(function (data) {
                    console.log('Artist albums', data.body);
                }, function (err) {
                    console.error(err);
                });
        }, function (err) {
            console.log('Something went wrong!', err);
        });

    
};

exports.authorized = function(req){
    console.log(reqx);
};

exports.getTracks = function(){
    var SpotifyWebApi = require('spotify-web-api-node');

    // credentials are optional
    var spotifyApi = new SpotifyWebApi({
        clientId: 'fcecfc72172e4cd267473117a17cbd4d',
        clientSecret: 'a6338157c9bb5ac9c71924cb2940e1a7',
        redirectUri: 'http://www.example.com/callback'
    });
};



