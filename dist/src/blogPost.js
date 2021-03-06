'use strict';

/**
 * Created by david on 4/23/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogPostSchema = new Schema({
    title: String,
    content: String,
    // here we are referencing a totally different schema (not just a subschema)
    // we use the [] array to show that we expect to have many different comments within
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

var BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;
//# sourceMappingURL=blogPost.js.map