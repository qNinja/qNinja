'use strict';


//TODO Turn this into a service?
var mongoose = require('mongoose'),
	SR = mongoose.model('Sr');

// wallboard2SR takes one or more wallboard SR objects as a parameter and outputs SR objects
exports.wallboard2SR = function(obj) {
	var output = [];
	for(var item in obj) {

		var sr = new SR();

		sr.sr_number = obj[item].SR_NUM;
		sr.sr_owner = obj[item].PSEUDOQUEUE_ID;
		sr.status  = obj[item].SR_SUBSTATUS;
		//sr.organization = '';
		sr.severity = obj[item].SR_SEVERITY;
		//sr.high_value = '';
		sr.brief_description = obj[item].SR_BRIEF_DESC;
		sr.detailed_description = obj[item].SR_SR_DESC;
		sr.last_act = obj[item].SR_LAST_ACT_COMMENT;
		sr.support_program = obj[item].SR_SUPPORT_PROGRAM;
		sr.support_group_routing = obj[item].SR_SUPPORT_GROUP_ROUTING;
		//sr.support_hours = '';
		sr.support_hours_and_org = obj[item].SUPPORT_HOURS;

		// contact info
		sr.respond_via = obj[item].RESPOND_VIA;
		//sr.first_name = '';
		//sr.last_name = '';
		//sr.email_address = '';
		//sr.phone_number = '';
		sr.contact_source = obj[item].SR_SOURCE;
		sr.on_site_phone = obj[item].CONTACT_PHONE;
		//sr.alt_contact_name = '';
		//sr.alt_contact_email = '';
		sr.alt_contact_phone = obj[item].ONSITE_PHONE;
		//sr.account_name = '';

		// metadata
		sr.created_ts = obj[item].CREATED;
		sr.last_act_ts = obj[item].LAST_UPD;

		output.push(sr);
	}
	return output;
};


// seibelprod2SR  takes one or more SeibelProduction SR objects as a parameter and outputs SR objects
exports.seibelprod2SR = function(obj) {
	var output = [];
	for(var item in obj) {

		var sr = new SR();

        sr.sr_number = obj[item].SR_NUM ;
        sr.sr_owner = obj[item].LOGIN;
        sr.status  = obj[item].SR_SUB_STAT_ID;
        sr.organization = obj[item].ORG;
        sr.severity = obj[item].SR_SEV_CD;
        // sr.high_value = '';
        sr.brief_description = obj[item].SR_TITLE;
        sr.detailed_description = obj[item].DESC_TEXT;
        sr.last_act = obj[item].X_LAST_ACT_COMMENT;
        sr.support_program = obj[item].X_SUPPORT_PROG;
        sr.support_group_routing = obj[item].X_SUPP_GRP_ROUTING;
        // sr.support_hours = '';
        // sr.support_hours_and_org = '';
        
        sr.respond_via = obj[item].X_RESPOND_VIA;
        sr.first_name = obj[item].FST_NAME;
        sr.last_name = obj[item].LAST_NAME;
        sr.email_address = obj[item].EMAIL_ADDR;
        sr.phone_number = obj[item].WORK_PH_NUM;
        sr.contact_phone_number = obj[item].CONTACT_PHONE;
        sr.contact_source = obj[item].SR_SOURCE;
        
        sr.alt_contact_name = obj[item].ALT_CONTACT_NAME;
        sr.alt_contact_email = obj[item].ALT_CON_EMAIL;
        sr.alt_contact_phone = obj[item].ALT_CON_PH_NUM;
        sr.on_site_phone = obj[item].ONSITE_PHONE;
        // sr.account_name = '';

        sr.created_ts = obj[item].CREATED;
        sr.last_act_ts = obj[item].LAST_UPD;

		output.push(sr);
	}
	return output;
};
