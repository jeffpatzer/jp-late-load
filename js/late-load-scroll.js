// Late load images on scroll
(function () {
  function lateLoad() {

    this.settings = {
      event     :   "scroll",
      threshold :   300,
      container :   window
    };
    var settings = this.settings;
    var imgs;

    var convenienceMethods = {
      belowTheFold: function() {
        if (settings.container === undefined || settings.container === window) {
          var fold = window.innerHeight + window.pageYOffset;
        }
        return fold <= this[0].y - settings.threshold;
      },
    }
    xui.extend(convenienceMethods);

    this.getImages = function() {
      imgs = x$("img[data-ll-src]")
      return imgs;
    }
    this.getImages();

    this.init = function() {
      x$(this.settings.container).on(this.settings.event, function(){
        imgs.each(function() {
          if (!x$(this).belowTheFold(this.settings)) {
            // console.log(this);
            // console.log(x$(this).offsetTop());
            if (x$(this).attr('data-ll-loaded') != 'true') {
              x$(this).attr('data-ll-loaded', 'true');
              x$(this).attr('src', x$(this).attr('data-ll-src'));
            }
          }
        });
      });

      x$(this.settings.container).fire(this.settings.container.event);
    }
    this.init();
  }

  document.jpLateLoad = new lateLoad();
  // Fire a scroll event to kick the widget off
  x$(window).fire('scroll');

})();

