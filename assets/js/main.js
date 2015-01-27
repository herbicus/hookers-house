console.log("main.js loaded");

if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function() {};

var cornerstoneAPI = (function(options) {
	var shared = {},
		options = options || {}

	var heroHeader = document.getElementById("l-hero-header");
	var heroTitle = document.getElementById("l-hero-title");
	var heroCopy = document.getElementById("l-hero-copy");
	var heroCopy2 = document.getElementById("l-hero-copy2");
	var heroDiv = document.getElementById("aboveFold");
	var leftContainer = document.getElementById("heroLeft");
	var rightContainer = document.getElementById("heroRight");

	for (var i = 0; i < sites.length; i++) {
		var heroImage = document.createElement("img");
		heroImage.id="l-hero-image";
		heroImage.src = sites[i].loadImage;

		heroImage.setAttribute("data-site-index", i);
		heroImage.setAttribute("data-stellar-ratio", i);

		$(heroImage).on("load", function(){
			var thisSiteIndex = this.getAttribute("data-site-index");
			console.log(this);
		});

	};

	var loadSite = function(siteIndex){

		currentSiteIndex = siteIndex;

		var heroImage = document.createElement("img");
		heroImage.setAttribute("data-stellar-ratio", 0.45);
		heroImage.id="l-hero-image";
		heroImage.src = sites[siteIndex].loadImage;
		
		leftContainer.appendChild(heroImage);

		heroHeader.innerHTML = sites[siteIndex].loadHeader;
		heroTitle.innerHTML = sites[siteIndex].loadTitle;
		heroCopy.innerHTML = sites[siteIndex].loadCopy;
		heroCopy2.innerHTML = sites[siteIndex].loadCopy2;

		var sitesBackground = sites[siteIndex].loadBackground;
		$("#aboveFold").css("background", sitesBackground);
		var bgImage = $( heroDiv ).css( "background" );
		console.log(sitesBackground);

		// $(heroImage).on("load", function(){
		// 	var thisSiteIndex = this.getAttribute("data-site-index");
		// 	console.log(this);
		// });

	};

	// TWEENMAX STUFF
	var menuAnimation = new TimelineMax({paused: true});
	menuAnimation.to(".l-splash-overlay", 0.2, { left: -5, ease: Back.easeInOut});

	var shakeTimeline = new TimelineMax({paused: true});
	shakeTimeline.to(".l-splash-overlay", 0.1, { left: -15, ease: Quad.easeInOut});
	shakeTimeline.to(".l-splash-overlay", 0.1, { left: 30, ease: Quad.easeInOut});
	shakeTimeline.to(".l-splash-overlay", 0.1, { left: -15, ease: Quad.easeInOut});
	shakeTimeline.to(".l-splash-overlay", 0.1, { left: 30, ease: Quad.easeInOut});
	shakeTimeline.to(".l-splash-overlay", 0.1, { left: 0, ease: Quad.easeInOut});

	// MOBILE ICON - HAMBURGER
	$(".mobile-nav-btn").on("click", function(){
		$(this).toggleClass("open");

  		if ($(this).hasClass("played")) {
  			menuAnimation.reverse();	
  		} else {
  			menuAnimation.play();
  		}	
  		$(this).toggleClass("played");
	});

	// SPLASH OVERLAY

	// SPLASH SCREEN YES BUTTON
	$(".splash-btn-yes").on("click", function(){
		TweenMax.to(".l-splash-overlay" , 0.75, {
			left: "200%",
			autoAlpha: 0,
			display: "none",
			ease: Quad.easeInOut
		}); 

		TweenMax.to(".l-section-hero, .l-section-two" , 0.75, {
			autoAlpha: 1,
			display: "block",
			ease: Back.easeInOut
		});
	});

	$('.splash-btn-no').on("click", function(){
		//$('.l-splash-overlay').effect("bounce", {times:3, distance : -5, direction : 'right'}, 300);
		$(this).toggleClass("open");

  		if ($(this).hasClass("played")) {
  			shakeTimeline.reverse();	
  		} else {
  			shakeTimeline.play();
  		}	
  		$(this).toggleClass("played");
	});

	// STELLAR JS STUFF
	$("#aboveFold").stellar();
	$.stellar({
	  // horizontalOffset: -250,
	  //verticalOffset: -400,
	  horizontalScrolling: false,
	  verticalScrolling: true,
	  responsive: true
	  // scrollProperty: 'scroll',
	  // positionProperty: 'position'
	});

	// init 
	var init = function() {	
		$(window).load();	
		sites.shuffle();
		loadSite(0);
	};

	shared.init = init;

	return shared;
}());

$(document).ready(function() {
	cornerstoneAPI.init();

});
