'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Queue = mongoose.model('Queue');

/**
 * Globals
 */
var queue, queue2;

/**
 * Unit tests
 */
describe('Queue Model Unit Tests:', function() {
	beforeEach(function(done) {
		function clearDB() {
			for (var i in mongoose.connection.collections) {
				mongoose.connection.collections[i].remove(function() {});
			}
			return done();
		}
		clearDB();



		queue = new Queue({
			name: "testname"
		});
		queue2 = new Queue({
			name: "testname"
		});
		done();
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return queue.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
		it('should require a name', function(done) {
			queue.name = '';
			return queue.save(function(err) {
				should.exist(err);
				done();
			});
		});
		it('should fail to save a duplicate queue', function(done) {
			queue.save(function(){
				queue2.save(function(err) {
					should.exist(err);
					done();
					return;
				});
			});
		});
		// it('should not be deleted if tracked by a team', function(done) {
		// 	done();
		// });
	});

	afterEach(function(done) { 
		Queue.remove().exec();
		done();
	});
});