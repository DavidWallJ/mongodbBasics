/**
 * Created by david on 4/23/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    // here we are referencing a totally different schema (not just a subschema)
    // we use the [] array to show that we expect to have many different comments within
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;