// Late load images on scroll
(function () {
  function lateload () {
    this.settings = {
      event     :   "scroll",
      threshold :   300,
      container :   window
    };
    var settings = this.settings;
    var imgs;


    var convenience_methods = {
      belowTheFold: function() {
        if (settings.container === undefined || settings.container === window) {
          var fold = window.innerHeight + window.pageYOffset;
        }
        return fold <= this[0].y - settings.threshold;
      },
    }
    xui.extend(convenience_methods);

    this.getImages = function () {
      imgs = x$("img[data-ll-src]")
      return imgs;
    }
    
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

    this.getImages();
    x$(this.settings.container).fire(this.settings.container.event);
  }

  document.jpLateload = new lateload;
})();

