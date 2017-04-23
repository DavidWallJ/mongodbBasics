'use strict';

/**
 * Created by david on 4/21/17.
 */
var assert = require('assert');
// these asserts are for checking only
var User = require('../src/user');

describe('reading users out of the database', function () {

    beforeEach(function (done) {
        // this joe variable is a global var just so we can call it outside of this function
        joe = new User({ name: 'Joe' });
        joe.save().then(function () {
            return done();
        });
    });

    it('finds all users with the name of joe', function (done) {
        User.find({ name: "Joe" }).then(function (users) {
            // in moongoose _id is actually an objectId("_id"). run toString() to pull it out
            // it's not a raw string until you toString it
            assert(users[0]._id.toString() === joe._id.toString());
            done();
        });
    });

    it('find a user with a particular id', function (done) {
        User.findOne({ _id: joe._id }).then(function (user) {
            assert(user.name === 'Joe');
            done();
        });
    });
});
//# sourceMappingURL=reading_test.js.map