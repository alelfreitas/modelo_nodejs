const api = require('../api/api');

const app = function (app) {

    app.route('/teste').get(api.getDados);

};

module.exports = app;