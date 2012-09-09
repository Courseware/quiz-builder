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

  // Plugin Constructor
  function QuizBuilder( element, options ) {
    this.element = element;

    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    this.controls();
  }

  QuizBuilder.prototype = {
    constructor: QuizBuilder,

    textHandler: function( event ) {
      var self = event.data;
      var tmpl = $( self.options.templates.text ).clone();
      tmpl.removeClass( 'template' ).show();
      $( self.element ).append( tmpl );
    },

    radiosHandler: function( event ) {
      var self = event.data;
      var tmpl = $( self.options.templates.radios ).clone();
      tmpl.removeClass( 'template' ).show();
      $( self.element ).append( tmpl );
    },

    checkboxesHandler: function( event ) {
      var self = event.data;
      var tmpl = $( self.options.templates.checkboxes ).clone();
      tmpl.removeClass( 'template' ).show();
      $( self.element ).append( tmpl );
    },

    removeAnswer: function( event ) {
      var self = event.data;
      if ( $(this).parents( 'p' ).size() > 0 ) {
        $(this).parent( 'p' ).remove();
      } else {
        return;
      }
    },

    duplicateAnswer: function( event ) {
      var self = event.data,
          parent = $(this).parent().find( 'p' ).clone();

      if ( !!parent[0] ) {
        parent = parent[0];
        $(parent).find( 'input' ).val( '' );
        $(this).after(parent);
      } else {
        return;
      }
    },

    controls: function() {
      var self = this;

      // Bind main controls
      $.each( this.options.controls, function( key, ctrl ){
        $( ctrl ).on( 'click', self, self[ key + 'Handler' ] );
      });

      // Bind radio/checkboxes deletion controls
      $.each( this.options.templates, function( key, ctrl ){
        var toRem = ctrl.replace( '.template', ' p .remove' );
        var toDup = ctrl.replace( '.template', ' .duplicate' );
        $( self.element ).on( 'click', toRem, self, self[ 'removeAnswer' ] );
        $( self.element ).on( 'click', toDup, self, self[ 'duplicateAnswer' ] );
      });
    }
  }

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if ( !$.data( this, 'quiz-options' ) ) {
        $.data( this, 'quiz-options', new QuizBuilder( this, options ) );
      }
    });
  }

  $(window).on('load', function () {
    $('[data-quiz="auto"]').each(function () {
      var $quiz = $(this);
      $quiz.quizBuilder($quiz.data());
    })
  })

}(jQuery, window));
