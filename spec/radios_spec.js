describe( 'Quiz Builder Radios', function() {
  var quiz, $element;

  beforeEach( function(){
    quiz = jQuery( '#demo' ).quizBuilder().data( 'quizInstance' );
    $element = jQuery( quiz.element );
  });

  it( 'allows adding a new radio question', function() {
    $element.find( '.quiz-new-radios' ).click();

    expect(
      $element.find( '.quiz-radios.question:visible' ).length
    ).toEqual( 1 );

    expect(
      $element.find( '.quiz-radios.question .option:visible' ).length
    ).toEqual( 1 );
  });

  it( 'updates quiz store on new radios question edits', function() {
    $element.find( '.quiz-radios.question .question-content .input:visible' ).val(
      'Radios Question Title'
    ).trigger( 'change' );

    expect(
      JSON.stringify( quiz.store() )
    ).toMatch( /Radios Question Title/ )
  });

  it( 'updates quiz store on new radios options edits', function() {
    $element.find( '.quiz-radios.question .option-content textarea:visible' ).val(
      'Possible Radio Answer'
    ).trigger( 'change' );

    expect(
      JSON.stringify( quiz.store() )
    ).toMatch( /Possible Radio Answer/ )
  });

  it( 'updates quiz store on new radios options checked events', function() {
    $element.find( '.quiz-radios.question .option-validation input:visible' ).attr(
      'checked', true
    ).trigger( 'click' );

    expect(
      JSON.stringify( quiz.store() )
    ).toMatch( /"valid":true/ )
  });

  it( 'allows adding a new radio option', function() {
    $element.find( '.quiz-radios.question .add:visible' ).click();

    expect(
      $element.find( '.quiz-radios.question .option:visible' ).length
    ).toEqual( 2 );
  });

  it( 'allows deleting a radio option', function() {
    $element.find( '.quiz-radios.question .remove:visible:first' ).click();

    expect(
      $element.find( '.quiz-radios.question .option:visible' ).length
    ).toEqual( 1 );
  });

  it( 'allows deleting question', function() {
    $element.find( '.quiz-radios.question:visible .delete' ).click();

    expect(
      $element.find( '.quiz-radios.question:visible' ).length
    ).toEqual( 0 );
  });
});
