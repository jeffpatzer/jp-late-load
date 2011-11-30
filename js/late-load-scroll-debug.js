
// This widget will late load images on scroll. This means that 
// only images that come in the viewport (and within a certain threshold)
// are ever downloaded as resources. 

/* 
* Usage
* 
* All img tag src attributes need to be renamed to data-ll-src
* All img tags that will be late-loaded need an additional attribute of data-ll-loaded='false'
*
*/
x$(document).on("DOMContentLoaded", function(){
  var settings = {
    event     :   "scroll",
    threshold :   300,        // How far ahead of the scroll should imgs be loaded
    container :   window
  };

  // Settings object
  // console.log("Settings object: ")
  // console.log(settings);
  // console.log("\n")

  var convenience_methods = {
    height: function() {
      // Height of the Viewport
      return window.innerHeight;
    },
    scrollTop: function() {
      // Scroll difference to the top of the page
      return window.pageYOffset;
    },
    offsetTop: function() {
      return this[0].offsetTop;
    },
    belowTheFold: function(settings) {
      // console.log("belowTheFold");
      if (settings.container === undefined || settings.container === window) {
        // the height of the page including the scroll distance to the top
        var fold = x$(settings.container).height() + x$(settings.container).scrollTop();
      } 
      // console.log("fold: " + fold);
      // console.log(x$(this).offsetTop());
      // console.log(fold <= x$(this).offsetTop());
      return fold <= x$(this).offsetTop() - settings.threshold; 
    },
    aboveTheTop: function(settings) {
      // console.log("aboveTheTop");
      if (settings.container === undefined || settings.container === window) {
        var fold = x$(window).scrollTop();
      }
      // console.log("fold: " + fold);
      // console.log(x$(this).offsetTop() + x$(this).height());
      return fold >= x$(this).offsetTop() + settings.threshold + x$(this).height();
    }
  }
  xui.extend(convenience_methods);


  // Test my extended Functions
  // x$('window').belowTheFold();
  // x$('window').aboveTheTop();
  // console.log("height(): " + x$(window).height());
  // console.log("scrollTop(): " + x$(window).scrollTop());
  // console.log("#20.offsetTop(): " + x$('#20').offsetTop());
  // x$('#20').belowTheFold(this, settings);
  // x$('#20').aboveTheTop(this, settings);8
  // console.log("\n");

  // console.log("DOMContentLoaded event fired.")
  var imgs = x$("img[data-ll-src]");
  // console.log(imgs);
  x$(settings.container).on(settings.event, function(){ 
    // console.log("Scroll event just fired.");
    imgs.each(function() {
      if (!x$(this).belowTheFold(settings)) {
        if (x$(this).attr('data-ll-loaded') != 'true') {
          x$(this).attr('data-ll-loaded', 'true');
          x$(this).attr('src', x$(this).attr('data-ll-src'));
        }
      }
    });
  });

  // Fire a scroll event to show the first few images
  x$(settings.container).fire("scroll");
});