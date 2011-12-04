## Image Late Loader on Scroll

This is a small JS meant to load images only as they come into view of the window. If they are not in view, the images are not loaded, this helps to speed up the render time of the page, while also saving resources by not downloading unnecessary items. There is a threshold setting that will determine how far ahead of the scroll event images should be loaded. 

## ToDo

1. Allow for options to be set without tweaking the JS file