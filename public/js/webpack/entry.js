require('antimoderate');
require('slick-carousel');
require('./search.js')();
var Blazy = require('blazy');
var exa = require('dir!./exa.config.js');

//jQuery modules
jQuery(document).ready(function () { "use strict";
    if (startCarousel) startCarousel();
    //require('./api/issue_list')();
    require('./api/pagination')(blogInfo);
    var bLazy = new Blazy();
});