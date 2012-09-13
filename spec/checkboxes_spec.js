describe( 'Quiz Builder Checkboxes', function() {
  var quiz, $element;

  beforeEach( function(){
    quiz = jQuery( '#demo' ).quizBuilder().data( 'quizInstance' );
    $element = jQuery( quiz.element );
  });

  it( 'allows adding a new radio question', function() {
    $element.find( '.quiz-new-checkboxes' ).click();

    expect(
      $element.find( '.quiz-checkboxes.question:visible' ).length
    ).toEqual( 1 );

    expect(
      $element.find( '.quiz-checkboxes.question .option:visible' ).length
    ).toEqual( 1 );
  });

  it( 'updates quiz store on new checkboxes question edits', function() {
    $element.find( '.quiz-checkboxes.question .question-content .input:visible' ).val(
      'Checkboxes Question Title'
    ).trigger( 'change' );

    expect(
      JSON.stringify( quiz.store() )
    ).toMatch( /Checkboxes Question Title/ )
  });

  it( 'updates quiz store on new checkboxes options edits', function() {
    $element.find( '.quiz-checkboxes.question .option-content textarea:visible' ).val(
      'Possible Checkbox Answer'
    ).trigger( 'change' );

    expect(
      JSON.stringify( quiz.store() )
    ).toMatch( /Possible Checkbox Answer/ )
  });

  it( 'updates quiz store on new checkboxes options checked events', function() {
    $element.find( '.quiz-checkboxes.question .option-validation input:visible' ).attr(
      'checked', true
    ).trigger( 'click' );

    expect(
      JSON.stringify( quiz.store() )
    ).toMatch( /"valid":true/ )
  });

  it( 'allows adding a new radio option', function() {
    $element.find( '.quiz-checkboxes.question .add:visible' ).click();

    expect(
      $element.find( '.quiz-checkboxes.question .option:visible' ).length
    ).toEqual( 2 );
  });

  it( 'allows deleting a radio option', function() {
    $element.find( '.quiz-checkboxes.question .remove:visible:first' ).click();

    expect(
      $element.find( '.quiz-checkboxes.question .option:visible' ).length
    ).toEqual( 1 );
  });

  it( 'allows deleting question', function() {
    $element.find( '.quiz-checkboxes.question:visible .delete' ).click();

    expect(
      $element.find( '.quiz-checkboxes.question:visible' ).length
    ).toEqual( 0 );
  });
});
