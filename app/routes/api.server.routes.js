'use strict';

module.exports = function(router) {


	// modules =================================================================
var request        = require('request');


	// models ==================================================================
var SR             = require('../models/sr.server.model.js');
var Agent          = require('../models/agent.server.model.js');
//var Queue          = require('../models/queue.server.model.js');


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

	// TEST Siebel Query =====================
router.route('/v1/bigqueue')
	.get(function(req, res) {
		var siebelURL = 'http://proetus.provo.novell.com/igor/marktest/getAllSRsInQueue.asp';
		request({
			url: siebelURL,
			json: true
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				res.json(body);
			}
		});
	});


	// Service Requests ========================================================
router.route('/v1/SRs')

	// get list of all SRs in queue and all items required for queue webui
	.get(function(req, res) {
		SR.find(function(err, srs) {
			if (err) {
				res.send(err);
			}
			res.json(srs);
		});
	});


router.route('/v1/SRs/:sr_number')

	// get all information for specific SR
	.get(function(req, res) {
		SR.find( {
			sr_number: req.params.sr_number
		},
		function(err, sr) {
			if (err) {
				res.send(err);
			}
			res.json(sr);
		});
	})


	// get ALL sr information for sr_number
	// update SR owner
	.patch(function(req, res) {
		// TODO query database first and make sure SR has not been assigned yet.
		// TODO test to see if that URL is case sensitive.
		request('http://proetus.provo.novell.com/igor/assign3.asp?sr=' + req.params.sr_number + '&owner=' + req.body.owner + '&force=1',
			function (error, response, body) {
				if (!error && response.statusCode === 200) {
					console.log(body); // print the web page
				}
				else {
					// TODO change this to send a message to the user.
					console.log('error updating SR# ' + req.params.sr_number + ' to new owner: ' + req.body.owner);
				}
			}
		);
	})

	// Delete SR
	// TODO Authentication
	.delete(function(req, res) {
		SR.remove(
			{
				sr_number: req.params.sr_number
			},
			function(err, sr) {
				if (err) {
					res.send(err);
				}
				res.json({ message: 'Successfully deleted' });
			}
		);
	});


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
