'use strict';

/**
 * Created by david on 4/23/17.
 */
var mongoose = require('mongoose');
var assert = require('assert');
var User = require('../src/user');
var Comment = require('../src/comment');
var BlogPost = require('../src/blogPost');

describe('associations', function () {
    var joe = void 0,
        blogPost = void 0,
        comment = void 0;
    beforeEach(function (done) {
        // nothing is done here to associate any of these items with each other
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'JS is Great', content: 'Sure is buddy.' });
        comment = new Comment({ content: 'Great assertion!' });

        // lets associate these items here; lets setup some relations

        //be careful blogPosts is part of the joe model and blogPost is the var from above
        // so we aren't really pushing this to joe.blogPosts but really just a reference...i think
        // a user has many blogPosts
        joe.blogPosts.push(blogPost);
        // a blogPost can have many comments
        blogPost.comments.push(comment);
        // a comment has a singe user
        comment.user = joe;

        //* comment.user doesn't really = joe mongoose is just setting up references

        // now lets send this all off to the db
        // time for some es6 magic for an array of promises combined into a single promise
        // frequently used when setting up associations

        Promise.all([joe.save(), blogPost.save(), comment.save()]).then(function () {
            return done();
        });
    });

    it('saves a relatioin between a user and a blogpost', function (done) {
        User.findOne({ name: 'Joe' })
        // populate allows you to add associated 'blogPosts' with 'Joe' to the findOne results.  Thus, user now has Joe's blogPosts attached.  'blogPosts' are ref'd in the user model and must be to work
        .populate('blogPosts').then(function (user) {

            assert(user.blogPosts[0].title === 'JS is Great');
            done();
        });
    });
});
//# sourceMappingURL=association_test.js.map