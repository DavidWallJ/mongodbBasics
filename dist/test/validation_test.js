'use strict';

/**
 * Created by david on 4/22/17.
 */
var assert = require('assert');
var User = require('../src/user');

describe('Validating records', function () {
    it('requires a user name', function () {
        var user = new User({ name: undefined });
        // validate is a synchronous process; its happening instantly we don't to wait.  If it took a while we'd need asynchronous validation and would use validate()

        var result = user.validateSync();

        // **NOTE** this is the route to the error message that you made in the schema
        // es6 equivalent 'const { message } = result.errors.name;'
        // because the const name is the same as the property name
        var message = result.errors.name.message;

        assert(message === 'User name required.');
    });

    it('requires a user name longer than 2 characters', function () {
        var user = new User({ name: 'Al' });
        var result = user.validateSync();
        var message = result.errors.name.message;

        assert(message === "Name must be longer than 2 characters.");
    });

    it('disallows invalid records from being saved', function (done) {
        var user = new User({ name: 'Al' });
        user.save().catch(function (fromSave) {
            var message = fromSave.errors.name.message;
            assert(message === 'Name must be longer than 2 characters.');
            done();
        });
    });
});
//# sourceMappingURL=validation_test.js.map