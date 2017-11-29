/*
* Translation - Extra Components
*/
$(function() {
  switchLanguage();
  /**** Automatic Language Translation ****/
  function switchLanguage() {

    var userLang = navigator.language || navigator.userLanguage;
    var language = 'en';
    if (userLang == 'fr') language = 'fr';
    if (userLang == 'es') language = 'es';

    /* If user has selected a language, we apply it */
    if ($.cookie('router-language')) {
      var language = $.cookie('router-language');
    }
    /* We get current language on page load */
    $("[data-translate]").jqTranslate('../../vendors/translator/translate', {
      forceLang: language
    });

    /* Change language on click in a select input for example */
    $('#switch-lang').on('change', function(e) {
      e.preventDefault();
      language = $(this).val();
      $("[data-translate]").jqTranslate('../../vendors/translator/translate', {
        forceLang: language
      });

      /* We save language inside a cookie */
      $.cookie('router-language', language);
      $.cookie('router-language', language, {
        path: '/'
      });
    });

  }
});