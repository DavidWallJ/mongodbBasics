'use strict';

/**
 * Created by david on 4/22/17.
 */
var assert = require('assert');
// these asserts are for checking only
var User = require('../src/user');

describe('Deleting a user', function () {

    beforeEach(function (done) {
        // this joe variable is a global var just so we can call it outside of this function
        joe = new User({ name: 'Joe' });
        joe.save().then(function () {
            return done();
        });
    });

    // these are different methods of removing the same instance of a user

    it('model instance remove', function (done) {
        joe.remove().then(function () {
            return User.findOne({ name: 'Joe' });
        }).then(function (user) {
            assert(user === null);
            done();
        });
    });

    it('model instance remove', function (done) {
        //remove a bunch of records with some given criteria
        User.remove({ name: 'Joe' }).then(function () {
            return User.findOne({ name: 'Joe' });
        }).then(function (user) {
            assert(user === null);
            done();
        });
    });

    it('class method findAndRemove', function (done) {
        User.findOneAndRemove({ name: 'Joe' }).then(function () {
            return User.findOne({ name: 'Joe' });
        }).then(function (user) {
            assert(user === null);
            done();
        });
    });

    it('class method findByIdAndRemove', function (done) {
        User.findByIdAndRemove(joe._id).then(function () {
            return User.findOne({ name: 'Joe' });
        }).then(function (user) {
            assert(user === null);
            done();
        });
    });
});
//# sourceMappingURL=delete_test.js.map