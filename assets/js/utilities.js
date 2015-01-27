console.log("utilities.js loaded");

var myUtilitiesAPI = (function(options) {
	var shared = {},
		options = options || {}

	// -------------------------------------
	//   SHUFFLE
	// -------------------------------------
	// -------------------------------------
	// -------------------------------------


	Array.prototype.shuffle = function() {
		var input = this;

		for (var i = input.length -1; i >= 0; i--) {

			var randomIndex = Math.floor(Math.random()*(i+1));
			var itemAtIndex = input[randomIndex];

			input[randomIndex] = input[i];
			input[i] = itemAtIndex;
		}
		return input;
	}

	// ----------- END SHUFFLE -------------

	// PRELOADER UTILITY
	var AceLoadImages = AceLoadImages || function(a, d, z) {
		a instanceof Array || (a = [a]);
		for (var e = a.length, f = 0, g = e; g--;) {
			var b = document.createElement("img");
			b.onload = function() {
				f++; 
				f >= e && isFunction(d) && d(z)
			};
			b.src = a[g]; 
		}
	}

	var isFunction = isFunction || function(functionToCheck) {
		var getType = {};
		return functionToCheck && getType.toString.call(functionToCheck) == '[object Function]';
	}

	
	// // USE
	// AceLoadImages([
	// 	// yourArrayOfImages.jpg,
	// 	// keepEmComming.jpg,
	// 	// calls imagesAreLoaded() function at end
	// ], imagesAreLoaded);

	// // USE A PRELOADING IMAGE/TWEENMAX AFTER LOADS
	// function imagesAreLoaded() {
	// 	// do whatever it is that cant happen before the images are ready
	// 	TweenMax.to("#splash-overlay" , 0.75, {
	//   		scale: 0,
	//   		autoAlpha: 0,
	//   		ease: Back.easeInOut
	//   	});
	// }
	// END PRELOAD UTILITY

	var init = function() {

	};
	
	shared.init = init;

	return shared;
}());

$(document).ready(function() {
	myUtilitiesAPI.init();

});
