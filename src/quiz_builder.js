/**
 * jQuery Quiz Builder Plugin - v.0.1
 *
 * (c) 2012, Coursewa.re
 */
;(function ( $, window, undefined ) {
  var pluginName = 'quizBuilder',
      document = window.document,
      defaults = {
        store: '#quiz-store',
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
    this.storeElement = $( this.options.store );

    this._defaults = defaults;
    this._name = pluginName;

    this.controls();
    this.storeBindings();
  }

  /**
   * Extends String object prototype to handle slug keys generation
   * @return String
   */
  String.prototype.slug = function() {
    return this.toLowerCase().replace( /[^\w ]+/g, '' ).replace( / +/g, '-' );
  }

  /**
   * Prototype definition
   */
  QuizBuilder.prototype = {
    constructor: QuizBuilder,

    store: function() {
      return $.parseJSON( this.storeElement.val() ) || [];
    },

    storeUpdate: function( data ) {
      data = JSON.stringify( data );
      this.storeElement.val( data );
    },

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
      $(this).parents( '.option' ).remove();
    },

    /**
     * Handles question removal
     * @param event, Object
     */
    deleteQuestion: function( event ) {
      $(this).parents( '.question' ).remove();
    },

    /**
     * Handles answer addition, in case of radios/checkboxes
     * @param event, Object
     */
    addAnswer: function( event ) {
      var template = $(this).parents( '.question' ).attr( 'class' );
      template = template.match( /quiz\-\w+/ )[0]
      var answer = $( '.template.' + template + ' .option' ).clone();
      $(this).parents( '.question' ).find( '.question-content' ).append( answer );
    },

    storeQuestion: function( event ) {
      console.log(event)
      var index;
      var self = event.data;
      var key = $(this).val().trim().slug();
      var type = $(this).parents( '.question' ).attr( 'class' ).match( /quiz-(\w+)/ );
      var store = self.store();
      var question = {
        type: type[1],
        slug: key,
        options: []
      }

      $(this).parent().find( '.option' ).each( function() {
        var option = {};
        var input = $( this ).find( '.option-validation input' );
        var text = $( this ).find( '.option-content textarea' );
        option[ 'valid' ] = !!$( input ).attr( 'checked' );
        option[ 'content' ] = $( text ).val();

        question.options.push(option);
      });

      for( var i=0; i < store.length; i++ ) {
        if ( store[ i ].slug === key ) {
          self.store[ i ] = question;
          index = i;
        }
      }

      if ( !index ) {
        store.push( question );
      }

      self.storeUpdate( store );

    },

    storeQuestionTrigger: function() {
      $(this).parents( '.question-content' ).find( '.input' ).trigger( 'change' );
    },

    /**
     * Binds up events to store modifications
     * @param event, Object
     */
    storeBindings: function( event ) {
      var self = this;

      // Bind questions and options to store
      $.each( this.options.templates, function( key, ctrl ){
        var question = ctrl.replace( '.template', ' .question-content .input' );
        $( self.element ).on( 'change', question, self, self[ 'storeQuestion' ] );

        var option = question.replace( '.input', ' .option textarea' );
        $( self.element ).on( 'change', option, self, self[ 'storeQuestionTrigger' ] );

        var validation = question.replace( '.input', ' .option input' );
        $( self.element ).on( 'click', validation, self, self[ 'storeQuestionTrigger' ] );
      });
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
        var toRem = ctrl.replace( '.template', ' .remove' );
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
