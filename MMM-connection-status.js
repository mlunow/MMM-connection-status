/* Magic Mirror
 * Module: MMM-connection-status
 *
 * By Sheya Bernstein https://github.com/sheyabernstein/MMM-connection-status
 * MIT Licensed.
 */

Module.register('MMM-connection-status', {

	// Default module config.
	defaults: {
		updateInterval:  60 * 1000, // every minute
		animationSpeed: 1000,

		retryDelay: 2500,
		initialLoadDelay: 0,
	},

	// Define start sequence.
	start: function() {
		Log.info('Starting module: ' + this.name);

		this.loaded = false;
		this.scheduleUpdate(this.config.initialLoadDelay);
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement('div');
		var connectionActive = this.checkConnection();

		if (window.navigator.onLine) {
			wrapper.className = 'small';
			wrapper.innerHTML = 'Internet is connected';
		} else {
			wrapper.className = 'normal bright';
			wrapper.innerHTML = 'No internet connection';
		}

		return wrapper;
	},

	checkConnection: function() {
		return window.navigator.onLine;
	},

	scheduleUpdate: function(delay, fn) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== 'undefined' && delay >= 0) {
			nextLoad = delay;
		}

		var self = this
		setTimeout(function() {
			self.getDom();
		}, nextLoad);
	},
})
