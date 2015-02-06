console.log("main.js loaded");

if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function() {};

var cornerstoneAPI = (function(options) {
	var shared = {},
		options = options || {}

	var heroHeader = document.getElementById("l-hero-header");
	var heroTitle = document.getElementById("l-hero-title");
	var heroCopy = document.getElementById("l-hero-copy");
	//var heroCopy2 = document.getElementById("l-hero-copy2");
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

		//heroHeader.innerHTML = sites[siteIndex].loadHeader;
		heroTitle.innerHTML = sites[siteIndex].loadTitle;
		heroCopy.innerHTML = sites[siteIndex].loadCopy;
		//heroCopy2.innerHTML = sites[siteIndex].loadCopy2;

		var sitesBackground = sites[siteIndex].loadBackground;
		$("#aboveFold").css("background", sitesBackground);

		var headerColor = sites[siteIndex].loadColor;
		$("#l-hero-header").css("color", headerColor);
		
		var shadowColor = sites[siteIndex].loadShadow;
		$("#l-hero-header").css("text-shadow", shadowColor);
		// var bgImage = $( heroDiv ).css( "background" );
		// console.log(sitesBackground);
	};

	// TWEENMAX STUFF
	var menuAnimation = new TimelineMax({paused: true});
	menuAnimation.to(".l-splash-overlay", 0.2, { left: -5, ease: Back.easeInOut});

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
			// left: "200%",
			autoAlpha: 1,
			display: "block",
			ease: Quad.easeInOut
		});

		// TweenMax.to(".l-section-hero, .l-section-two" , 0.75, {
		// 	autoAlpha: 1,
		// 	display: "block",
		// 	ease: Back.easeInOut
		// });
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

	var crossFade = new TimelineMax({paused: true});
	crossFade.to("#aboveFold", 0.3, { autoAlpha: 0, ease: Quad.easeInOut});
	crossFade.to("#aboveFold", 0.3, { autoAlpha: 1, ease: Quad.easeInOut});

	$(".header-switch-gen").on("click", function(){

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
		});
	});

	$(".header-switch-joe").on("click", function(){

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
		});
	});

	// SPLASH SCREEN GENERAL BUTTON
	$(".l-btn-general").on("click", function(){
		TweenMax.to(".l-splash-overlay" , 0.75, {
			//left: "200%",
			autoAlpha: 0,
			scale: 0,
			left: "-32%",
			top: "-30%",
			display: "none",
			ease: Quad.easeInOut
		}); 

		loadSite(0);

		TweenMax.to(".l-section-hero, .l-section-2, .l-section-3, footer" , 0.75, {
			autoAlpha: 1,
			display: "block",
			ease: Back.easeInOut
		});

		TweenMax.to(".top-header-section" , 0.75, {
			// left: "200%",
			autoAlpha: 1,
			ease: Quad.easeInOut
		}); 
	});

	// SPLASH SCREEN JOE BUTTON
	$(".l-btn-joe").on("click", function(){
		TweenMax.to(".l-splash-overlay" , 0.75, {
			autoAlpha: 0,
			scale: 0,
			left: "-32%",
			top: "-30%",
			display: "none",
			ease: Quad.easeInOut
		}); 

		loadSite(1);

		TweenMax.to(".l-section-hero, .l-section-2, .l-section-3, footer" , 0.75, {
			autoAlpha: 1,
			display: "block",
			ease: Back.easeInOut
		});

		TweenMax.to(".top-header-section" , 0.75, {
			// left: "200%",
			autoAlpha: 1,
			ease: Quad.easeInOut
		}); 
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
