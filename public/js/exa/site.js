/* enable CSS features that have JavaScript */
jQuery('html').removeClass('no-js');

/* determine if screen can handle touch events */
if ( ! (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))) {
	jQuery('html').addClass('no-touch');
}

/* simple way of determining if user is using a mouse */
var screenHasMouse = false;
function themeMouseMove() {
	screenHasMouse = true;
}
function themeTouchStart() {
	jQuery(window).off("mousemove");
	screenHasMouse = false;
	setTimeout(function() {
		jQuery(window).on("mousemove", themeMouseMove);
	}, 250);
}
if ( ! /(iPad|iPhone|iPod)/g.test(navigator.userAgent) ) {
	jQuery(window).on("touchstart", themeTouchStart).on("mousemove", themeMouseMove);
	if (window.navigator.msPointerEnabled) {
		document.addEventListener("MSPointerDown", themeTouchStart, false);
	}
}

jQuery(document).ready(function () { "use strict";

	/* handle both mouse hover and touch events for traditional menu + mobile hamburger */
	jQuery('#top .site-menu-toggle').on('click',function(e) {
		jQuery('#top').toggleClass('open-mobile-menu');
		e.preventDefault();
	});
	
	jQuery(document).on({
		mouseenter: function () {
			if (screenHasMouse) {
				jQuery(this).addClass("hover");
			}
		},
		mouseleave: function () {
			if (screenHasMouse) {
				jQuery(this).removeClass("hover");
			}
		}
	}, '#site-menu li:not(.menu-item-search)');

	if ( ! jQuery('html').hasClass('no-touch')) {
		jQuery('#site-menu li.menu-item-has-children > a').on('click', function (e) {
			if ( ! screenHasMouse && ! window.navigator.msPointerEnabled && ! jQuery('#top .site-menu-toggle').is(":visible") ) {
				var $parent = jQuery(this).parent();
				if ( ! $parent.parents('.hover').length) {
					jQuery('#site-menu li.menu-item-has-children').not($parent).removeClass('hover');
				}
				$parent.toggleClass("hover");
				e.preventDefault();
			}
		});

		/* toggle visibile dropdowns if touched outside the menu area */
		jQuery(document).on('click', function(e) {
			if (jQuery(e.target).parents('#site-menu').length > 0) {
				return;
			}
			jQuery('#site-menu li.menu-item-has-children, #site-menu li.menu-item-search').removeClass('hover');
		});
	}

	jQuery('#site-menu li.menu-item-search > a').on('click', function (e) {
		var $parent = jQuery(this).parent();
		if ( ! $parent.parents('.hover').length) {
			jQuery('#site-menu li.menu-item-has-children').not($parent).removeClass('hover');
		}
		$parent.toggleClass('hover');
		if ($parent.hasClass('hover')) {
			window.setTimeout(function() {
				jQuery('#site-menu .searchform input[type="search"]').focus();
			}, 150);
		}
		e.preventDefault();
	});

	jQuery('.tabs a').on('click', function (e) {
		var $parent = jQuery(this).parent();
		e.preventDefault();
		if ($parent.hasClass('active')) return;
		$parent.siblings('li').each(function() {
			jQuery(this).removeClass('active');
			jQuery(jQuery(this).find('a').attr('href')).hide();
		});
		$parent.addClass('active');
		var hash = $parent.find('a').attr('href');
		jQuery(hash).show();
	});

});

/* A fix for the iOS orientationchange zoom bug */
!function(a){function m(){d.setAttribute("content",g),h=!0}function n(){d.setAttribute("content",f),h=!1}function o(b){return a.orientation,90==Math.abs(a.orientation)?(h&&m(),void 0):(l=b.accelerationIncludingGravity,i=Math.abs(l.x),j=Math.abs(l.y),0==j||i/j>1.2?h&&n():h||m(),void 0)}var b=navigator.userAgent;if (/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(b)&&b.indexOf("AppleWebKit")>-1&&-1==b.indexOf("CriOS")){var c=a.document;if (c.querySelector){var d=c.querySelector("meta[name=viewport]");if (d){var i,j,l,e=d&&d.getAttribute("content"),f=e+",maximum-scale=1",g=e+",maximum-scale=10",h=!0;a.addEventListener("orientationchange",m,!1),a.addEventListener("devicemotion",o,!1)}}}}(this);