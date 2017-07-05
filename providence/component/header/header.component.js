'use strict';

angular.module('header').
component('appHeader', {
  templateUrl: '/providence/component/header/header.template.html',
  controller: function HeaderController(jsLoader) {
    jsLoader.loadJS('/providence/bundles/application','headerJS');
    //<script type="text/javascript">
    window.googleTranslateElementInit = function() {
      new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
    };
    //</script>
    jsLoader.loadJS('//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');

  }
});
