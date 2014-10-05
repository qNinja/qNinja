'use strict';

/**
 * Module dependencies.
 */


module.exports = function(app) {

	app.route('/getServiceRequests').post(getServiceRequests(req, res));

	app.route('/mail/sendMail').post(requestHandler(req, res));

};
