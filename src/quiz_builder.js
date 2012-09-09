/**
 * jQuery Quiz Builder Plugin - v.0.1
 *
 * (c) 2012, Coursewa.re
 */
;(function ( $, window, undefined ) {
  var pluginName = 'quizBuilder',
      document = window.document,
      defaults = {
        controls: {
          text: '.quiz-new-text',
          radios: '.quiz-new-radios',
          checkboxes: '.quiz-new-checkboxes'
        },
        templates: {
          text: '.quiz-text.template',
          radios: '.quiz-radios.template',
          checkboxes: '.quiz-checkboxes.template'
        }
      };

  /**
   * Constructor
   */
  function QuizBuilder( element, options ) {
    this.element = element;

    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    this.controls();
  }

  /**
   * Prototype definition
   */
  QuizBuilder.prototype = {
    constructor: QuizBuilder,

    /**
     * Handles addition of one option/one answer questions
     * @param event, Object
     */
    textHandler: function( event ) {
      var self = event.data;
      var tmpl = $( self.options.templates.text ).clone();
      tmpl.removeClass( 'template' ).show();
      $( self.element ).append( tmpl );
    },

    /**
     * Handles addition of multiple options/one answer questions
     * @param event, Object
     */
    radiosHandler: function( event ) {
      var self = event.data;
      var tmpl = $( self.options.templates.radios ).clone();
      tmpl.removeClass( 'template' ).show();
      $( self.element ).append( tmpl );
    },

    /**
     * Handles addition of multiple options/multiple answers questions
     * @param event, Object
     */
    checkboxesHandler: function( event ) {
      var self = event.data;
      var tmpl = $( self.options.templates.checkboxes ).clone();
      tmpl.removeClass( 'template' ).show();
      $( self.element ).append( tmpl );
    },

    /**
     * Handles answers removal, in case of radios/checkboxes
     * @param event, Object
     */
    removeAnswer: function( event ) {
      $(this).parent( 'p' ).remove();
    },

    /**
     * Handles question removal
     * @param event, Object
     */
    deleteQuestion: function( event ) {
      $(this).parent( 'div' ).remove();
    },

    /**
     * Handles answer addition, in case of radios/checkboxes
     * @param event, Object
     */
    addAnswer: function( event ) {
      var template = $(this).parent().attr( 'class' );
      var answer = $( '.template.' + template + ' p' ).clone();
      $(this).after(answer);
    },

    /**
     * Binds up callbacks to main controls
     * @param event, Object
     */
    controls: function() {
      var self = this;

      // Bind main controls
      $.each( this.options.controls, function( key, ctrl ){
        $( ctrl ).on( 'click', self, self[ key + 'Handler' ] );
      });

      // Bind radio/checkboxes deletion controls
      $.each( this.options.templates, function( key, ctrl ){
        var toRem = ctrl.replace( '.template', ' p .remove' );
        var toAdd = ctrl.replace( '.template', ' .add' );
        var toDel = ctrl.replace( '.template', ' .delete' );
        $( self.element ).on( 'click', toRem, self, self[ 'removeAnswer' ] );
        $( self.element ).on( 'click', toAdd, self, self[ 'addAnswer' ] );
        $( self.element ).on( 'click', toDel, self, self[ 'deleteQuestion' ] );
      });
    }
  }

  /**
   * A really lightweight plugin wrapper around the constructor,
   * preventing against multiple instantiations
   */
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if ( !$.data( this, 'quiz-options' ) ) {
        $.data( this, 'quiz-options', new QuizBuilder( this, options ) );
      }
    });
  }

  /**
   * Data API
   */
  $(window).on('load', function () {
    $('[data-quiz="auto"]').each(function () {
      var $quiz = $(this);
      $quiz.quizBuilder($quiz.data());
    })
  })

}(jQuery, window));
