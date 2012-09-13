describe( 'Quiz Builder Text', function() {
  var quiz, $element;

  beforeEach( function(){
    quiz = jQuery( '#demo' ).quizBuilder().data( 'quizInstance' );
    $element = jQuery( quiz.element );
  });

  it( 'allows adding a new text question', function() {
    $element.find( '.quiz-new-text' ).click();

    expect(
      $element.find( '.quiz-text.question:visible' ).length
    ).toEqual( 1 );
  });

  it( 'updates quiz store on new text question edits', function() {
    $element.find( '.quiz-text.question .question-content .input:visible' ).val(
      'Question Title'
    ).trigger( 'change' );

    expect(
      JSON.stringify( quiz.store() )
    ).toMatch( /Question Title/ )
  });

  it( 'updates quiz store on new text options edits', function() {
    $element.find( '.quiz-text.question .option-content textarea:visible' ).val(
      'Possible Answer'
    ).trigger( 'change' );

    expect(
      JSON.stringify( quiz.store() )
    ).toMatch( /Possible Answer/ )
  });

  it( 'allows deleting question', function() {
    $element.find( '.quiz-text.question:visible .delete' ).click();

    expect(
      $element.find( '.quiz-text.question:visible' ).length
    ).toEqual( 0 );
  });
});
