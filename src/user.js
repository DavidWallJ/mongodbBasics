const mongoose = require('mongoose');
const PostSchema = require('./postSchema');
const Schema = mongoose.Schema;


// this is the template for the 'user collection
const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
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
UserSchema.virtual('postCount').get(function(){
    // we're using function here instead of the fat arrow function because of 'this'.  if you we use the fat arrow function this would point outside of this function
    return this.posts.length;
});

// some middleware
// using this type of function() instead of () => so we can use 'this'
// next is a mongoose function often used to redirect middleware to the 'next' thing after it's done running
UserSchema.pre('remove', function(next) {
    const BlogPost = mongoose.model('blogPost');
    // instead of looping through the list of posts we can use an $in operator
    BlogPost.remove({_id: {$in: this.blogPosts}})
        .then(() => next());
});

// creates a collection called 'user'
// User represents the entire collection of data
const User = mongoose.model('user', UserSchema);

// only the model class is exported
module.exports = User;