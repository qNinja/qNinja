'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller'),
	converter = require('../converter.server.controller'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	request = require('request');

var APIServer = 'http://proetus.provo.novell.com';
var APIServerDir = '/igor/marktest/';


// Get ALL SRs from Wallboard ==================================================
exports.getAllSRsInQueue = function(req, res) {
	console.log('getAllSRsInQueue called');
	var RequestURL = APIServer + APIServerDir + 'getAllSRsInQueue.asp';
	request(
	{
		url: RequestURL,
		json: true
	},
	function (error, response, body) {
		if (!error && response.statusCode === 200) {
			res.json(converter.wallboard2SR(body));
		}
	});
};


// Get detailed SR info from SiebelProd ========================================
exports.getSRInfo = function(req, res) {
	// console.log('getSRInfo called');
	var RequestURL = APIServer + APIServerDir + 'getSRInfo.asp?sr=' + req.params.sr_number;
	console.log('querying: ' + RequestURL);
	request({
		url: RequestURL,
		json: true
	},
	function (error, response, body) {
		if (!error && response.statusCode === 200) {
			res.json(converter.seibelprod2SR(body));
		}
	});
};


// TODO query database first and make sure SR has not been assigned yet.
// TODO test to see if that URL is case sensitive.
exports.assignSR = function(req, res) {
	var RequestURL = APIServer + APIServerDir + 'assignSR.asp?sr=' + req.params.sr_number + '&owner=' + req.body.owner;
	console.log('Assigning SR with URL: ' + RequestURL);
	request(RequestURL,
		function (error, response, body) {
			if (!error && response.statusCode === 200) {
				console.log('Assigned SR ' + req.params.sr_number + ' to ' + req.body.owner);
			}
			else {
				// TODO change this to send a message to the user.
				console.log('Error updating SR# ' + req.params.sr_number + ' to new owner: ' + req.body.owner);
				res.send(body);
			}
		}
	);
};
