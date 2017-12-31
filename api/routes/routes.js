module.exports = function (app) {

    var songtracker = require('../controllers/controller');
    // Routes
    app.route('/authorize')
        .get(songtracker.authorize)
        .post(songtracker.authorize);
    app.route('/auth-callback')
        .get(songtracker.authorized);
    app.route('/elvis')
        .get(songtracker.elvis);
    app.route('/tracks')
        .get(songtracker.getTracksFromSpotify);
};