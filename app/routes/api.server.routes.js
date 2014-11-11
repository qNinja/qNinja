'use strict';

module.exports = function(router) {

	// modules =================================================================
	var request = require('request');

	// API Routes ==============================================================
	var apiv1 = require('../../app/controllers/apiv1.server.controller');

	// models ==================================================================
	var SR             = require('../models/sr.server.model');
	var Agent          = require('../models/agent.server.model');
	//var Queue          = require('../models/queue.server.model.js');


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
	router.route('/v1/SRs/:sr_number').post(apiv1.assignSR);


	// Agents ==================================================================
	router.route('/v1/agents')

	// add new agent
	.post(function(req, res) {
		var agent = new Agent();
		agent.first_name = req.body.first_name;
		agent.last_name = req.body.last_name;
		agent.username = req.body.username;
		agent.save(function(err) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'Agent created!'});
		});
	})

	// get list of all agents
	.get(function(req, res) {
		Agent.find(function(err, agents) {
			if (err) {
				res.send(err);
			}
			res.json(agents);
		});
	})

	// delete agent
	// TODO authentication
	.delete(function(req, res) {
		Agent.remove(
			{
				username: req.params.username
			},
			function(err, sr) {
				if (err) {
					res.send(err);
				}
				res.json({ message: 'Successfully deleted' });
			}
		);
	});



	router.route('/v1/agents/:username')

	// retrieve agent object
	.get(function(req, res) {
		Agent.find( {
			username: req.params.username
		},
		function(err, agent) {
			if (err) {
				res.send(err);
			}
			res.json(agent);
		});
	})

	// delete specific agent - enable OAuth before allowing this.
	.delete(function(req, res) {
		Agent.remove(
			{
				username: req.params.username
			},
			function(err, agent) {
				if (err) {
					res.send(err);
				}
				res.json({ message: 'Successfully deleted' });
			}
		);
	});


	router.route('/v1/agents/:username/SRs')

	// get all open SRs owned by agent
	.get(function(req, res) {
		SR.find(
			{
				sr_owner: req.params.username
			},
			function(err, agent) {
				if (err) {
					res.send(err);
				}
				res.json(agent);
			}
		);
	});


	// frontend routes =========================================================
	// route to handle all angular requests
	//router.get('*', function(req, res) {
	//	res.sendfile('./app/index.html'); // load our public/index.html file
	//});
};
