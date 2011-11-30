
x$(document).on("DOMContentLoaded", function(){
  var settings = {
    event     :   "scroll",
    threshold :   300,           container :   window
  };
  var convenience_methods = {
    height: function() {
      return window.innerHeight;
    },
    scrollTop: function() {
      return window.pageYOffset;
    },
    offsetTop: function() {
      return this[0].offsetTop;
    },
    belowTheFold: function(settings) {
      if (settings.container === undefined || settings.container === window) {
        var fold = x$(settings.container).height() + x$(settings.container).scrollTop();
        }                     return fold <= x$(this).offsetTop() - settings.threshold;    },
        aboveTheTop: function(settings) {
          if (settings.container === undefined || settings.container === window) {
            var fold = x$(window).scrollTop();
          }
          return fold >= x$(this).offsetTop() + settings.threshold + x$(this).height();
        }
      }
      xui.extend(convenience_methods);
      var imgs = x$("img[data-ll-src]");
      x$(settings.container).on(settings.event, function(){       imgs.each(function() {
        if (!x$(this).belowTheFold(settings)) {
          if (x$(this).attr('data-ll-loaded') != 'true') {
            x$(this).attr('data-ll-loaded', 'true');
            x$(this).attr('src', x$(this).attr('data-ll-src'));
          }
        }
      });
    });
    x$(settings.container).fire("scroll");
  });