var express = require('express'),
    app = express(),
    port = process.env.PORT || 8888,
    mongoose = require('mongoose');
    SpotifyTrackRecord = require('./api/models/spotifyTrackRecordModel');

mongoose.Promise = global.Promise;    
mongoose.connect('mongodb://localhost:27017/SpotifyTracks');

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('SpotifyTrackAnalyzer server started on: ' + port);
