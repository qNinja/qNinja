'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Agent Schema
 */
var AgentSchema = new Schema({
	first_name : { type: String, required: true },
	last_name : { type: String, required: true },
	username : { type: String, required: true, uppercase: true, index: { unique: true } },
	agent_WF : Number,
	//tickets_taken : { 
	//	sr_number : Number, 
	//	date_taken : Date
	//},
	//tickets_closed : {
	//	number : Number,
	//	last_updated : Date
	//}
});

mongoose.model('Agent', AgentSchema);