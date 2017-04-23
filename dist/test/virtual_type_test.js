'use strict';

/**
 * Created by david on 4/23/17.
 */
var assert = require('assert');
var User = require('../src/user');

describe('virtual types', function () {
    //virtual fields / virtual types are only on the server NOT in the db
    it('postCount returns number of posts', function (done) {
        var joe = new User({
            name: 'Joe',
            posts: [{ title: 'Post Title' }]
        });

        joe.save().then(function () {
            return User.findOne({ name: 'Joe' });
        }).then(function (user) {
            assert(user.postCount === 1);
            done();
        });
    });
});
//# sourceMappingURL=virtual_type_test.js.map