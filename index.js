"use strict";
/**
 *
 */

(function() {

	// Set the root and store any previous package under the same name
	var	root		= this;
	var oldPackage	= root.jsunittest;

	/**
	 * Assert
	 *
	 * Throws the message if the value doesn't equal what it should
	 *
	 * @name assert
	 * @access private
	 * @param mixed val				The value to test
	 * @param mixed	against			The value to test against val
	 * @param String msg			The message to display if the values don't match
	 * @return void
	 */
	function assert(val, against, msg) {
		if(val !== against) {
			throw '    this.assert(' + String(val) + ', ' + String(against) + ', ' + String(msg) + ")\n" +
					'AssertionError: ' + String(msg);
		}
	}

	/**
	 * Assert True
	 *
	 * Throws the message if the value doesn't equal true
	 *
	 * @name assertTrue
	 * @access private
	 * @param mixed val				The value to test against true
	 * @param String msg			The message to display if the value isn't true
	 * @return void
	 */
	function assertTrue(val, msg) {
		if(!val) {
			throw '    this.assertTrue(' + String(val) + ', ' + String(msg) + ")\n" +
					'AssertionError: ' + String(msg);
		}
	}

	/**
	 * Assert False
	 *
	 * Throws the message if the value doesn't equal false
	 *
	 * @name assertFalse
	 * @access private
	 * @param mixed val				The value to test against false
	 * @param String msg			The message to display if the value isn't false
	 * @return void
	 */
	function assertFalse(val, msg) {
		if(val) {
			throw '    this.assertFalse(' + String(val) + ', ' + String(msg) + ")\n" +
					'AssertionError: ' + String(msg);
		}
	}

	/**
	 * Run
	 *
	 * Runs all test_* methods in the passed object, displaying any assertions
	 * that fail
	 *
	 * @name run
	 * @param Object obj				The class to run
	 * @return bool
	 */
	function run(obj) {

		// Add the methods to the object
		obj['assert']		= assert;
		obj['assertTrue']	= assertTrue;
		obj['assertFalse']	= assertFalse;

		// Get the current time
		var iStart	= new Date().getTime();

		// Init the count of tests
		var iTests	= 0;

		// Init the list of errors
		var lErrors	= [];

		// Step through each function starting with 'test_'
		for(var k in obj) {
			if(typeof obj[k] == 'function' && k.length > 5 && k.substring(0, 5) == 'test_') {

				// Increment the number of tests
				++iTests;

				try {
					obj[k]();
					console.log(k + ' ... ok');
				} catch(e) {
					console.log(k + ' ... FAIL');
					lErrors.push({
						"function":	k,
						"message":	e
					})
				}
			}
		}

		// Seperator
		console.log(' ');

		// Get the time taken
		var fSeconds	= (new Date().getTime() - iStart) / 1000.0;

		// If there's any errors
		if(lErrors.length) {

			// Display

			// Go through each one and display it
			for(var i = 0; i < lErrors.length; ++i) {
				console.error('======================================================================\n' +
								'FAIL: ' + lErrors[i]['function'] + '\n' +
								'----------------------------------------------------------------------\n' +
								lErrors[i]['message'] + '\n');
			}
		}

		// Inform
		console.log('\n----------------------------------------------------------------------\nRan ' +
					String(iTests) + ' tests in ' + fSeconds.toFixed(3) + 's');
	}

	// Init the exported class
	var jsunittest	= {"run":run}

	// If exports is defined
	if(typeof exports !== 'undefined' ) {

		// If module and module.exports are defined
		if(typeof module !== 'undefined' && module.exports) {

			// Set exports and module exports to jsunittest
			exports = module.exports = jsunittest
		}

		// Set exports.jsunittest to jsunittest
		exports.jsunittest = jsunittest
	}

	// Else, just add it to the root
	else {
		root.jsunittest = jsunittest;
	}

// Call the closure with this
}).call(this);
