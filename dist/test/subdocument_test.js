'use strict';

/**
 * Created by david on 4/22/17.
 */
var assert = require('assert');
var User = require('../src/user');

describe('subdocuments', function () {
    it('can create a subdocument', function (done) {
        var joe = new User({
            name: 'Joe',
            // if you look at the model you know you need an array and if you look at the postSchema you know you need a title property and value
            posts: [{ title: 'PostTitle' }]
        });

        joe.save().then(function () {
            return User.findOne({ name: 'Joe' });
        }).then(function (user) {
            assert(user.posts[0].title === "PostTitle");
            done();
        });
    });

    it('can add subdocuments to an existing record', function (done) {
        var joe = new User({
            name: 'Joe',
            //empty array not required just for testing clarity
            posts: []
        });
        joe.save().then(function () {
            return User.findOne({ name: 'Joe' });
        })
        // because the content below is wrapped in {} nothing is returned, thus return user.save() to keep the .then chain rolling
        .then(function (user) {
            user.posts.push({ title: 'New Post' });
            // have to save the whole thing here not just the post
            return user.save();
        }).then(function () {
            return User.findOne({ name: 'Joe' });
        }).then(function (user) {
            assert(user.posts[0].title === 'New Post');
            done();
        });
    });

    it('can remove an existing subdocument', function (done) {
        var joe = new User({
            name: 'Joe',
            posts: [{ title: 'New Title' }]
        });

        joe.save().then(function () {
            return User.findOne({ name: 'Joe' });
        }).then(function (user) {
            // remove is mongoose function not vanilla js
            // you aren't actually working directly with the db here you are accessing a copy of the user and then saving the updated user/user posts to the db
            user.posts[0].remove();
            //save on the parent of what you're updating
            return user.save();
        }).then(function () {
            return User.findOne({ name: 'Joe' });
        }).then(function (user) {
            assert(user.posts.length === 0);
            done();
        });
    });
});
//# sourceMappingURL=subdocument_test.js.map