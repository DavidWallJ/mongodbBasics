/**
 * Created by david on 4/23/17.
 */
const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('associations', () => {
    let joe, blogPost, comment;
    beforeEach((done) => {
        // nothing is done here to associate any of these items with each other
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({title: 'JS is Great', content: 'Sure is buddy.'});
        comment = new Comment({content: 'Great assertion!'});

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

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    it('saves a relation between a user and a blogpost', (done) => {
        User.findOne({name: 'Joe'})
        // populate allows you to add associated 'blogPosts' with 'Joe' to the findOne results.  Thus, user now has Joe's blogPosts attached.  'blogPosts' are ref'd in the user model and must be to work
            .populate('blogPosts')
            .then((user) => {

                assert(user.blogPosts[0].title === 'JS is Great');
                done();
            });
    });

    // this is how you get deeper and deeper into the object.  populate/path repeat
    it('saves a full relation graph', (done) => {
        User.findOne({name: 'Joe'})
            .populate({
                // path looks into joe find blogPosts
                path: 'blogPosts',
                // inside of the blogPosts load up an additional association
                populate: {
                    path: 'comments',
                    // mongoose needs to know from which model here when we looking for something nested in something
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title === "JS is Great");
                assert(user.blogPosts[0].comments[0].content === 'Great assertion!');
                assert(user.blogPosts[0].comments[0].user.name === 'Joe');
                done();
            });
    });
});