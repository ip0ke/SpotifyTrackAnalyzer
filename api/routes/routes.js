module.exports = function (app) {

    var songtracker = require('../controllers/controller');
    // Routes
    app.route('/authorize')
        .get(songtracker.authorize)
        .post(songtracker.authorize);
    app.route('/auth-callback')
        .get(songtracker.authorized);
};