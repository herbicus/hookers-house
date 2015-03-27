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
  	var heroTag = document.getElementById("l-char-tagline");
	var heroDiv = document.getElementById("aboveFold");
	var leftContainer = document.getElementById("heroLeft");
	var rightContainer = document.getElementById("heroRight");


	for (var i = 0; i < sites.length; i++) {
		var heroImage = document.createElement("img");
		heroImage.id="l-hero-image";
		heroImage.src = sites[i].loadImage;

		heroImage.setAttribute("data-site-index", i);
		heroImage.setAttribute("data-stellar-ratio", 0.45);

		$(heroImage).on("load", function(){
			var thisSiteIndex = this.getAttribute("data-site-index");
			console.log(this);
		});
	};

	var loadSite = function(siteIndex){

		currentSiteIndex = siteIndex;
		console.log("Changing to image:" + currentSiteIndex);

		while (leftContainer.children.length > 0) {
			leftContainer.removeChild(leftContainer.children[0]);
		}

		var heroImage = document.createElement("img");
		heroImage.setAttribute("data-stellar-ratio", 0.45);
		heroImage.id="l-hero-image";
		heroImage.src = sites[siteIndex].loadImage;
		
		leftContainer.appendChild(heroImage);

		heroTitle.innerHTML = sites[siteIndex].loadTitle;
		heroCopy.innerHTML = sites[siteIndex].loadCopy;
		heroCopy2.innerHTML = sites[siteIndex].loadCopy2;
    	heroTag.innerHTML = sites[siteIndex].loadTag;

		// var sitesBackground = sites[siteIndex].loadBackground;
		// $("#aboveFold").css("background", sitesBackground);

		var headerColor = sites[siteIndex].loadColor;
		$("#l-hero-header").css("color", headerColor);
		
		var shadowColor = sites[siteIndex].loadShadow;
		$("#l-hero-header").css("text-shadow", shadowColor);
	};

	// TWEENMAX STUFF
	var menuAnimation = new TimelineMax({paused: true});
	menuAnimation.to(".l-mobile-nav", 0.5, { left: 0,  autoAlpha: 1, ease: Back.easeInOut});

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

	var shakeTimeline = new TimelineMax({paused: true});
	shakeTimeline.to(".l-splash-overlay", 0.1, { left: -15, ease: Quad.easeInOut});
	shakeTimeline.to(".l-splash-overlay", 0.1, { left: 30, ease: Quad.easeInOut});
	shakeTimeline.to(".l-splash-overlay", 0.1, { left: -15, ease: Quad.easeInOut});
	shakeTimeline.to(".l-splash-overlay", 0.1, { left: 30, ease: Quad.easeInOut});
	shakeTimeline.to(".l-splash-overlay", 0.1, { left: 0, ease: Quad.easeInOut});

	// SPLASH OVERLAY

	// SPLASH SCREEN YES BUTTON
	$(".splash-btn-yes").on("click", function(){
		TweenMax.to(".l-verify-container" , 0.75, {
			autoAlpha: 0,
			ease: Quad.easeInOut
		});

		TweenMax.to(".l-character-choice" , 0.75, {
			autoAlpha: 1,
			display: "block",
			ease: Quad.easeInOut
		});
	});

	$('.splash-btn-no').on("click", function(){
		$(this).toggleClass("open");

  		if ($(this).hasClass("played")) {
  			shakeTimeline.reverse();	
  		} else {
  			shakeTimeline.play();
  		}	
  		$(this).toggleClass("played");
	});

	var crossFade = new TimelineMax({paused: true});
	crossFade.to("#aboveFold", 0.3, { autoAlpha: 0, ease: Quad.easeInOut});
	crossFade.to("#aboveFold", 0.3, { autoAlpha: 1, ease: Quad.easeInOut});

  $(".l-switch-btn-left").on("mouseover", function(){
    // AUDIO
    var playing = false;

    if (playing == true) {
      document.getElementById('generalAudio').pause();
      document.getElementById('joeAudio').pause();      
      playing = false;

    } else {
      document.getElementById('generalAudio').play();
      document.getElementById('joeAudio').pause();
      document.getElementById('generalAudio').currentTime = 0;
      playing = true;
    }
  });

	$(".l-switch-btn-left").on("click", function(){

		TweenMax.to("#aboveFold" , 0.5, {
			marginLeft: -100,
			display: "none",
			autoAlpha: 0,
			ease: Linear.easeNone,
			onComplete: function() {
				$("#aboveFold").removeClass("played");
				loadSite(0);
				TweenMax.to("#aboveFold" , 0.5, {
					autoAlpha: 1,
					marginLeft: 0,
					display: "block",
					onComplete: function() {
						$("#aboveFold").removeClass("played");		
					}
				});
			}
		}); // end tweenmax
	});

	$(".l-switch-btn-right").on("mouseover", function(){
	    // AUDIO
	    var playing = false;

	    if (playing == true) {
	      document.getElementById('joeAudio').pause();
	      document.getElementById('generalAudio').pause();
	      playing = false;

	      return false;

	    } else {
	      document.getElementById('joeAudio').play();
	      document.getElementById('generalAudio').pause();
	      document.getElementById('joeAudio').currentTime = 0;
	      playing = true;
	    }
	});

	$(".l-switch-btn-right").on("click", function(){

    	TweenMax.to("#aboveFold" , 0.5, {
			marginLeft: -100,
			display: "none",
			autoAlpha: 0,
			ease: Linear.easeNone,
			onComplete: function() {
				$("#aboveFold").removeClass("played");
				loadSite(1);
				TweenMax.to("#aboveFold" , 0.5, {
					autoAlpha: 1,
					marginLeft: 0,
					display: "block",
					onComplete: function() {
						$("#aboveFold").removeClass("played");
					}
				});
			}
		}); // end tween
	});

	// FROM SPLASH TO SITE ANIMATION TIMELINE
	var toSiteTransition = new TimelineMax({paused: true});
	
	toSiteTransition.to(".l-splash-overlay", 0.75, { autoAlpha: 0, left: "-100%", display: "none", ease: Quad.easeInOut});
	toSiteTransition.to(".l-section-hero, .l-characters-section, .l-section-2, .l-section-3, footer", 0.75, { display: "block", autoAlpha: 1, ease: Quad.easeInOut}, 0.25);
	// toSiteTransition.to(".l-splash-overlay", 0.75, { autoAlpha: 1, ease: Quad.easeInOut}, 0.25);
	toSiteTransition.to(".top-header-section", 0.75, { autoAlpha: 1, ease: Quad.easeInOut}, 0.25);
	
	// SPLASH SCREEN GENERAL BUTTON
	$(".l-btn-general").on("click", function(){

		loadSite(0);

		toSiteTransition.play();

	    // AUDIO
	    var playing = false;

	    if (playing == true) {
	      document.getElementById('joeAudio').pause();
	      document.getElementById('generalAudio').pause();
	      playing = false;

	    } else {
	      document.getElementById('generalAudio').play();
	      document.getElementById('joeAudio').pause();
	      playing = true;
	    }

	});

	// SPLASH SCREEN JOE BUTTON

	$(".l-btn-joe").on("click", function(){
	    
	    loadSite(1);

	    toSiteTransition.play();

	    // AUDIO
	    var playing = false;

	    if (playing == true) {
	      document.getElementById('joeAudio').pause();
	      document.getElementById('generalAudio').pause();
	      playing = false;

	    } else {
	      document.getElementById('joeAudio').play();
	      document.getElementById('generalAudio').pause();
	      playing = true;
	    }

	});

	// HEADER STUFF - FUNCTIONALITY
	$("header li a").on("click", function(e){
		e.preventDefault();
		$(this).toggleClass("active");
	})

	// SCROLL TO
	$(".section-1").click(function() {
	    $('html, body').animate({
	        scrollTop: $(".l-characters-section").offset().top -160
	    }, 2000);
	});

	$(".section-2").click(function() {
	    $('html, body').animate({
	        scrollTop: $(".l-section-2").offset().top-160
	    }, 2000);
	});

	$(".section-3").on("click", function(){
		$('html, body').animate({
		    scrollTop: $(".l-section-3").offset().top-160
		}, 2000);
	});

	$(".section-4").on("click", function(){
		$('html, body').animate({
		    scrollTop: $("footer").offset().top-160
		}, 2000);
	});

	// Parallax stuff - hero seciton
	var heroBackgroundParallax = new TimelineMax({paused: true});
				
	heroBackgroundParallax.to(".l-section-hero", 2, {css:{"background-position-y": 300}});

	window.addEventListener("scroll", function(){
		var parallaxTiming = document.body.scrollTop / 5000;

		$(".l-section-hero").waypoint(function() {

			heroBackgroundParallax.seek(parallaxTiming);

		}, { offset: "90%" });
	});

	// Parallax stuff - map section
	var backgroundParallax = new TimelineMax({paused: true});
				
	backgroundParallax.to(".l-section-3", 2, {css:{"background-position-y": 200}});

	window.addEventListener("scroll", function(){
		var parallaxTiming = document.body.scrollTop / 5000;

		$(".l-section-3").waypoint(function() {

			backgroundParallax.seek(parallaxTiming);

		}, { offset: "90%" });
	});

	// init 
	var init = function() {	
		$(window).load();
		
		// STELLAR JS STUFF
		$("#aboveFold").stellar();
		
		$.stellar({
		  horizontalScrolling: false,
		  verticalScrolling: true,
		  responsive: true
		});	

		loadSite();
	};

	shared.init = init;

	return shared;
}());

$(document).ready(function() {
	cornerstoneAPI.init();

});
