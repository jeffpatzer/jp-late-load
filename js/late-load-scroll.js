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

    this.init = function() {
      this.getImages();
      
      x$(this.settings.container).on(this.settings.event, function(){
        imgs.each(function() {
          if (!x$(this).belowTheFold(this.settings)) {
            if (x$(this).attr('data-ll-loaded') != 'true') {
              x$(this).attr('data-ll-loaded', 'true');
              x$(this).attr('src', x$(this).attr('data-ll-src'));
            }
          }
        });
      });

      x$(this.settings.container).fire(this.settings.event);
    }
    this.init();
  }

  document.imgLateLoad = new lateLoad();

})();

