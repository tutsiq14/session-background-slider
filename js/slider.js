/*  This will animate a slider and always keep the state in sessionStorage. 
*   When reloading pages, the state will be retrieved from sessionStorage rather than be reset.
*   You HTML should have a container with the class of .bg-container and it should contain
*   elements with id set to element-1, element-2 etc. The elements should have varying bg-images.
*/

var bgSlider = (function(){

  var playback = false;
  var slideCount = 0;

  //If the session index is not already set do it now
  if (!sessionStorage.currentSlide) {
    sessionStorage.currentSlide = 0;
  }

  jQuery(document).ready(function(){
    jQuery(".bg-slider > *").height(jQuery(window).height());
    slideCount = jQuery(".bg-slider li").length;

    setActiveSlide(parseInt(sessionStorage.currentSlide));

    //play(7000); // plays the slideshow at a rate of 7000ms per slide
    play(3000);

  });

  jQuery(window).resize(function(){
    jQuery(".bg-slider > *").height(jQuery(window).height());
  });

  var play = function(interval) {

    //Sets the default interval to 5000ms
    interval = typeof interval !== 'undefined' ? interval : 5000;

    playback = true;

    var slider = setInterval (function(){
      if (playback) {
        nextSlide();
      } else {
        clearInterval(slider);
      }
    }, interval);
  };

  var stop = function () {
    playback = false;
  };

  var nextSlide = function(){

    var $elements = jQuery(".bg-slider > *");

    var startIndex = 0;

    //Set startIndex to what's stored in the session
    if (sessionStorage.currentSlide) {
      startIndex = parseInt(sessionStorage.currentSlide);
    }

    //If there are more slides, ative the next one, otherwise start over
    if ($elements.length - 1 > startIndex) {
      setActiveSlide(startIndex+1);
      sessionStorage.currentSlide = parseInt(sessionStorage.currentSlide) + 1;
    } else {
      setActiveSlide(0);
      sessionStorage.currentSlide = 0;
    }
  };

  var setActiveSlide = function (index) {
    //Find the current active element
    jQuery(".bg-slider > .slide-active").removeClass('slide-active').addClass('slide-hidden');
    //Make the target element active
    jQuery(".bg-slider > *").eq(index).addClass('slide-active').removeClass('slide-hidden');
  };

  //Public properties goes here
  return {
    play: function() { play(); },
    stop: function() { stop(); },
    nextSlide: function(){ stop(); nextSlide(); },
    setActiveSlide: function(index){ stop(); setActiveSlide(index); }
  };
})(bgSlider);
