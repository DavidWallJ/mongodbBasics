'use strict';

var mongoose = require('mongoose');
var PostSchema = require('./postSchema');
var Schema = mongoose.Schema;

// this is the template for the 'user collection
var UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: function validator(name) {
                return name.length > 2;
            },
            message: 'Name must be longer than 2 characters.'
        },
        required: [true, 'User name required.']
    },
    // this is how you bring in the schema from an other file and embed it within this model
    // posts aren't the same as blogPosts.  all for demo purposes.  this is a subdocuments/subtype/etc example
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        // this ref shows where these blog posts will be coming from
        ref: 'blogPost'
    }]
});

// defining a virtual property
// post count when called is going to behave alike a function and run the function content
UserSchema.virtual('postCount').get(function () {
    // we're using function here instead of the fat arrow function because of 'this'.  if you we use the fat arrow function this would point outside of this function
    return this.posts.length;
});

// creates a collection called 'user'
// User represents the entire collection of data
var User = mongoose.model('user', UserSchema);

// only the model class is exported
module.exports = User;
//# sourceMappingURL=user.js.map