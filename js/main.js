"use strict";
if(typeof Placeholdem === 'function') {
	if (document.querySelectorAll( '[placeholder]' ).length) {
		Placeholdem( document.querySelectorAll( '[placeholder]' ) );
	};
}


function pieChart() {
	//circle progress bar
	if ((jQuery().easyPieChart) && (jQuery.support.leadingWhitespace)) {
		var count = 0 ;
		//var colors = ['#fbcf61', '#e6557c', '#00c1e4'];
		var colors = ['#30a79b'];
		jQuery('.chart').each(function(){
				
			var imagePos = jQuery(this).offset().top;
			var topOfWindow = jQuery(window).scrollTop();
			if (imagePos < topOfWindow+900) {

				jQuery(this).easyPieChart({
			        barColor: colors[count],
					trackColor: '#ffe79b',
					scaleColor: false,
					scaleLength: false,
					lineCap: 'butt',
					lineWidth: 3,
					size: 200,
					rotate: 0,
					animate: 3000,
					onStep: function(from, to, percent) {
							jQuery(this.el).find('.percent').text(Math.round(percent));
						}
			    });
			}
			count++;
			if (count >= colors.length) { count = 0};
		});
	}
}


function animateElements() {

	//animation to elements
	var windowHeight = jQuery(window).height();
	jQuery('.to_fade, .block-header, .block-header + p').each(function(){
	var imagePos = jQuery(this).offset().top;
	var topOfWindow = jQuery(window).scrollTop();
		if (imagePos < topOfWindow+windowHeight-100) {
			jQuery(this).addClass("animated fadeInUp");
		}
	});

	jQuery('.to_slide_left').each(function(){
	var imagePos = jQuery(this).offset().top;
	var topOfWindow = jQuery(window).scrollTop();
		if (imagePos < topOfWindow+windowHeight-100) {
			jQuery(this).addClass("animated fadeInLeft");
		}
	});

	jQuery('.to_slide_right').each(function(){
	var imagePos = jQuery(this).offset().top;
	var topOfWindow = jQuery(window).scrollTop();
		if (imagePos < topOfWindow+windowHeight-100) {
			jQuery(this).addClass("animated fadeInRight");
		}
	});

	jQuery('.to_animate_child_blocks').each(function(){
	var imagePos = jQuery(this).offset().top;
	var topOfWindow = jQuery(window).scrollTop();
		if (imagePos < topOfWindow+windowHeight-100) {
			jQuery(this).find('.block').each(function(index){
				var self = jQuery(this);
				setTimeout(function(){
					self.addClass("animated fadeInRight");
				}, index*200);
			});
		}
	});

}

jQuery(document).ready(function() {
	//menu
	if (jQuery().superfish) {
		jQuery('ul.sf-menu').superfish({
			delay:       700,
			animation:   {opacity:'show',height:'show'},
			animationOut: {opacity: 'hide'},
			speed:       'fast',
			disableHI:   false,
			cssArrows:   false,
			autoArrows:  false
		});
	}
	
	
	//counters init on scroll
	if (jQuery().appear) {
		jQuery('.counter').appear();
		jQuery('body').on('appear', '.counter', function(e, $affected ) {
			jQuery($affected).each(function(index){
				if (jQuery(this).hasClass('counted')) {
					return;
				} else {
					jQuery(this).countTo().addClass('counted');
				}
				
			});
		});
	}

	//toTop
	if (jQuery().UItoTop) {
        jQuery().UItoTop({ easingType: 'easeOutQuart' });
    }

	
	//parallax
	if (jQuery().parallax) {
		jQuery('#progress').parallax("50%", 0.2);
		jQuery('#footer').parallax("50%", 0.2);
	}

    //prettyPhoto
    if (jQuery().prettyPhoto) {
	   	jQuery("a[data-gal^='prettyPhoto']").prettyPhoto({
	   		hook: 'data-gal',
			theme: 'facebook' /* light_rounded / dark_rounded / light_square / dark_square / facebook / pp_default*/
	  	});
	}

   	//carousel
   	if (jQuery().carousel) {
		jQuery('.carousel').carousel();
	}

	//owl carousel
	if (jQuery().owlCarousel) {
		//upcomming events carousel
	    jQuery(".owl-carousel.owl-items-3").owlCarousel({
	    	navigation : true,
	    	navigationText : false,
	    	pagination : false,
	    	items: 3
	    });
	    //team carousel
	    jQuery(".owl-carousel.team").owlCarousel({
	    	navigation : true,
	    	navigationText : false,
	    	pagination : false,
	    	items: 4,
	    });
	    //partners
	    jQuery(".partners").owlCarousel({
	    	navigation : true,
	    	navigationText : false,
	    	pagination : false,
	    	items: 5,
	    	autoPlay: 5000
	    });
	}
  
	//single page localscroll and scrollspy
	var navHeight = jQuery('#header').outerHeight(true) + 40;
	jQuery('body').scrollspy({
		target: '.mainmenu_wrap',
		offset: navHeight
	});
	if (jQuery().localScroll) {
		jQuery('#mainmenu, #land').localScroll({
			duration:1900,
			easing:'easeOutQuart',
			offset: 0
		});
		
	}

	//portfolio and horizontal slider animation
	jQuery('.portfolio_links').find('a').css({opacity: 0});
	jQuery('.isotope-item, .horizontal_slider_introimg, .portfolio_item_image').hover(
	 	function() {
			jQuery( this ).find('.portfolio_links a').stop().animate({ opacity: 1}, 50, 'easeOutExpo').parent().find('.p-view').toggleClass('moveFromLeft').end().find('.p-link').toggleClass('moveFromRight');
		}, function() {
			jQuery( this ).find('.portfolio_links a').stop().animate({ opacity: 0}, 50, 'easeOutExpo').parent().find('.p-view').toggleClass('moveFromLeft').end().find('.p-link').toggleClass('moveFromRight');
		}
	);

	//twitter
	//slide tweets
	jQuery('#tweets .twitter').bind('loaded', function(){
		jQuery(this).addClass('flexslider').find('ul').addClass('slides');
	});
	if (jQuery().tweet) {
		jQuery('.twitter').tweet({
			modpath: "./twitter/",
		    count: 1,
		    avatar_size: 48,
		    loading_text: 'loading twitter feed...',
		    join_text: 'auto',
		    username: 'ThemeForest', 
		    template: "{avatar}{time}{join}<span class=\"tweet_text\">{tweet_text}</span>"
		});
	}

});

jQuery(window).load(function(){
	
	//init gallery
	Grid.init();

		//chart
	pieChart();
	
	
	setTimeout(function(){
		jQuery('.progress-bar').addClass('stretchRight');

		//init animation
		animateElements();
	}, 600);

	//stick header to top
	if (jQuery().sticky) {
	    jQuery("#header").sticky({ 
	    		topSpacing: 0,
	    		scrollBeforeStick: 220
	    	},
	    	function(){ 
	    		jQuery("#header").stop().animate({opacity:0}, 0).delay(500).stop().animate({opacity:1}, 800);
	    	},
	       	function(){ 
	    		jQuery("#header").stop().animate({opacity:0}, 0).delay(800).stop().animate({opacity:1}, 1000);
	    	}
	    );
	}
	
	jQuery('body').delay(1000).scrollspy('refresh');

	//preloader
	jQuery(".preloaderimg").fadeOut();
	jQuery(".preloader").delay(200).fadeOut("slow").delay(200, function(){
		jQuery(this).remove();
	});

	//fractionslider
	if (jQuery().fractionSlider) {
		var $mainSlider = jQuery('#mainslider');
		jQuery('.slider').fractionSlider({
			'fullWidth': 			true,
			'controls': 			false, 
			'pager': 				true,
			'responsive': 			true,
			'dimensions': 			"1920,700",
		    'increase': 			true,
			'pauseOnHover': 		false,
			'slideEndAnimation': 	true,
			'timeout' : 			3000,
			'speedOut' : 			1000
			
		});
	}



	//flickr
	// use http://idgettr.com/ to find your ID
	if (jQuery().jflickrfeed) {
		jQuery("#flickr").jflickrfeed({
			flickrbase: "http://api.flickr.com/services/feeds/",
			limit: 6,
			qstrings: {
				id: "63512867@N07"
			},
			itemTemplate: '<a href="{{image_b}}" data-gal="prettyPhoto[pp_gal]"><li><img alt="{{title}}" src="{{image_s}}" /></li></a>'
		}, function(data) {
			jQuery("#flickr a").prettyPhoto({
				hook: 'data-gal',
				theme: 'facebook'
	   		});
	   		jQuery("#flickr li").hover(function () {						 
			   jQuery(this).find("img").stop().animate({ opacity: 0.5 }, 200);
		    }, function() {
			   jQuery(this).find("img").stop().animate({ opacity: 1.0 }, 400);
		    });
		});
	}

});

jQuery(window).resize(function(){
	if (jQuery().sticky) {
		jQuery("#header").sticky('update');
	}
	jQuery('body').scrollspy('refresh');

});

jQuery(window).scroll(function() {

	animateElements();
		pieChart();
});