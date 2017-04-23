'use strict';

var assert = require('assert');
// assert is part of mocha (mocha is used for testing)
var User = require('../src/user');

describe('creating records', function () {
    it('saves a user', function (done) {
        var joe = new User({ name: 'Joe' });

        // this is how you save to the database
        joe.save().then(function () {
            // has joe been saved successfully
            // isNew is a mocha function that data has been saved to the db
            // isNew === true means it hasn't been saved to the db
            assert(!joe.isNew);
            // done is a mocha function that tells mocha to move on
            done();
        });
    });
});
//# sourceMappingURL=create_test.js.map