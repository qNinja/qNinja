'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Queue Schema
 */
var QueueSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	}
});

mongoose.model('Queue', QueueSchema);
