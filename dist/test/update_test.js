'use strict';

/**
 * Created by david on 4/22/17.
 */
var assert = require('assert');
// these asserts are for checking only
var User = require('../src/user');

describe('Updating records', function () {
    var joe = void 0;

    beforeEach(function (done) {
        joe = new User({ name: 'Joe', likes: 5 });
        joe.save().then(function () {
            return done();
        });
    });

    function assertName(operation, done) {
        operation.then(function () {
            return User.find({});
        }) // no critera; get all
        .then(function (users) {
            assert(users.length === 1);
            assert(users[0].name === 'Alex');
            done();
        });
    }

    // these both do the same thing

    it('instance type using set n save', function (done) {
        joe.set('name', "Alex");
        assertName(joe.save(), done);
    });

    it('a model instance can update', function (done) {
        assertName(joe.update({ name: 'Alex' }), done);
    });

    it('a model class can update', function (done) {
        assertName(User.update({ name: 'Joe' }, { name: 'Alex' }), done);
    });

    it('a model class can update one record', function (done) {
        assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done);
    });

    it('a model class can with an id and update', function (done) {
        assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
    });

    // part 2

    it('increment user likes by 1', function (done) {
        var currentCount = joe.likes;
        // $inc is an update operator.  you can also use it to decrement
        User.update({ name: 'Joe' }, { $inc: { likes: 1 } }).then(function () {
            return User.findOne({ name: 'Joe' });
        }).then(function (user) {
            assert(user.likes === currentCount + 1);
            done();
        });
    });
});
//# sourceMappingURL=update_test.js.map