'use strict';

module.exports = function(router) {

	// modules =================================================================
	var request = require('request');

	// API Routes ==============================================================
	var apiv1 = require('../../app/controllers/apiv1.server.controller');

	// models ==================================================================
	var SR             = require('../models/sr.server.model');
	//var Agent          = require('../models/agent.server.model');


	// API Test Endpoints =====================================================
	router.use(function(req, res, next) {
		console.log('Time: %d: API has been called.', Date.now());
		next();
	});

	router.route('/')

	.get(function(req, res) {
		res.json({ message: 'qNinja API Online.' });
		console.log('API test page /api queried.');
	});


	// V1 API ==================================================================
	router.route('/v1')

	.get(function(req, res) {
		res.json({ message: 'qNinja API v1 Online.' });
		console.log('API test page /api/v1 queried.');
	});

	// Service Requests =====================
	router.route('/v1/SRs').get(apiv1.getAllSRsInQueue);
	router.route('/v1/SRs/:sr_number').get(apiv1.getSRInfo);
	router.route('/v1/SRs/:sr_number').put(apiv1.assignSR);


	// frontend routes =========================================================
	// route to handle all angular requests
	//router.get('*', function(req, res) {
	//	res.sendfile('./app/index.html'); // load our public/index.html file
	//});
};
