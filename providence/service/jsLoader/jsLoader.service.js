'use strict';
angular.module('jsLoader', []).
factory('jsLoader', function() {
  //var shinyNewServiceInstance;
  // factory function body that constructs shinyNewServiceInstance
  function loadJS(url, id){
    var s = 'script';
    var d = document;
    //  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = url;
    fjs.parentNode.insertBefore(js, fjs);
    //    }(document, s, id));
  }
  return {loadJS:loadJS};
});
