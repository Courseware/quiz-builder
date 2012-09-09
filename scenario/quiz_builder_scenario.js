var casper = require('casper').create();

casper.start('index.html', function() {
    this.test.assertTitle('Quiz Builder');
    this.test.assertExists('div[id="demo"]');
});

casper.then(function() {
    this.test.assertTitle('Quiz Builder');
    this.test.assertEval(function() {
        return __utils__.findAll('h2').length == 1;
    });
});

casper.run(function() {
    this.test.renderResults(true);
});
