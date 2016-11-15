var $ = require('jquery');
var Backbone = require('backbone');
require('./router');

// DOM Ready
$(function(){
  Backbone.history.start();
});
