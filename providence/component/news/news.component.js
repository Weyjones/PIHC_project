'use strict';

angular.module('news').
component('appNews', {
  templateUrl: '/providence/component/news/news.template.html',
  controller: function NewsController(jsLoader) {
    jsLoader.loadJS('//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7','facebook-jssdk');
    (function () {
      var resizeTimer;
      window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          if ("undefined" !== typeof "FB.XFBML.parse") {
            $('#fb-container').html('<div class="fb-page" data-href="https://www.facebook.com/PIHCSnohomish/" data-tabs="timeline" data-width="1200" data-height="300px" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/facebook" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/facebook">Facebook</a></blockquote></div>');
            FB.XFBML.parse();
          }
        }, 500);
      });
    })();
  }
});
