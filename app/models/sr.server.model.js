'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Sr Schema
 */
var SrSchema = new Schema({
	// general info
	sr_number : { type: String, required: true, index: { unique: true } },
	sr_owner : { type: String, required: true, uppercase: true },
	status : { type: String, required: true },
	organization : { type: String, required: true, uppercase: true },
	severity : { type: String, required: true },
	high_value : Boolean,
	brief_description: String,
	detailed_description : String,
	last_act : String,
	support_program : String,
	support_group_routing : String,
	support_window : String,
	
	// contact info
	respond_via : { type: String, required: true },
	first_name : { type: String, required: true },
	last_name : { type: String, required: true },
	email_address : { type: String, required: true },
	phone_number : String, // keep in mind international numbers and extensions.
	contact_source : { type: String, required: true },
	on_site_phone : String,
	alt_contact_name : String,
	alt_contact_email : String,
	alt_contact_phone : String,
	account : String, // not available in srinfo-all

	// metadata
	created_ts : String,
	last_act_ts : String
	//igor_assigned_at : Date
});

mongoose.model('Sr', SrSchema);

// validation ==================================================================
// SrSchema.path('sr_number').validate(function (v) {
// 	return ( v.length === 11 );
// }, 'The SR must be 11 digits long.');

// SrSchema.path('organization').validate(function (v){
// 	return ( v === 'USA' || v === 'CANADA' || v === 'EMEA' || v === 'ASIAPAC' || v === 'LATIN AMERICA' || v === 'Default Organization');
// }, 'Organization is not valid.');

// SrSchema.path('severity').validate(function (v){
// 	return ( v === 'High' || v === 'Medium' || v === 'Low' || v === 'Critical' );
// }, 'Severity is not valid.');

// SrSchema.path('respond_via').validate(function (v){
// 	return ( v === 'Call' || v === 'Chat' || v === 'Email');
// }, 'respond_via is not valid.');
