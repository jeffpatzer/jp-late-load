// Late load images on scroll
var mw_lateLoad = function(){
  var imgs = x$("img[data-ll-src]");
  x$(settings.container).on(settings.event, function(){
    imgs.each(function() {
      if (!x$(this).belowTheFold(settings)) {
        // console.log(this);
        // console.log(x$(this).offsetTop());
        if (x$(this).attr('data-ll-loaded') != 'true') {
          x$(this).attr('data-ll-loaded', 'true');
          x$(this).attr('src', x$(this).attr('data-ll-src'));
        }
      }
    });
  });
};
x$(document).on("DOMContentLoaded", function() {
  var settings = {
    event     :   "scroll",
    threshold :   300,
    container :   window
  };
  var convenience_methods = {
    belowTheFold: function(settings) {
      if (settings.container === undefined || settings.container === window) {
        var fold = window.innerHeight + window.pageYOffset;
      }
      return fold <= this[0].y - settings.threshold;
    },
  }
  xui.extend(convenience_methods);
  mw_lateLoad();
  x$(window).fire("scroll");
});
