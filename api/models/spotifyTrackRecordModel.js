var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpotifyTrackRecordsSchema = new Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    trackid: String,
    trackname: String,
    trackduration: Number,
    artistid: String,
    artistname: String,
    playedat: Date
});

module.exports = mongoose.model('SpotifyTrackRecords', SpotifyTrackRecordsSchema);

