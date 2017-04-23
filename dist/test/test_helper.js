'use strict';

/**
 * Created by david on 4/21/17.
 */
var mongoose = require('mongoose');

// use the local environments promise style which is currently es6
mongoose.Promise = global.Promise;

// mongoose connect
// before unlike beforeEach only runs once
// done ensures that even if mongoose takes a while to load it waits until it's really connected

before(function (done) {
    mongoose.connect('mongodb://localhost/users_test');
    mongoose.connection.once('open', function () {
        done();
    }).on('error', function (error) {
        console.warn('Warning', error);
    });
});

// before each test in this situation the users table will be dropped
// 'done' is a mocha object that signals to mocha it can now move on
beforeEach(function (done) {
    // es6 pulls the users, comments, and blogPosts off of the collections object and gives you the three consts
    // NOTE: when mongoose loads up these collections to mongo db the names will be com all lowercase so you've changed 'blogPosts' to 'blogposts'
    var _mongoose$connection$ = mongoose.connection.collections,
        users = _mongoose$connection$.users,
        comments = _mongoose$connection$.comments,
        blogposts = _mongoose$connection$.blogposts;
    // in mongoose you have to drop collections one at a time

    users.drop(function () {
        comments.drop(function () {
            blogposts.drop(function () {
                done();
            });
        });
    });
});
//# sourceMappingURL=test_helper.js.map