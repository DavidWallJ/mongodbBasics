'use strict';

/**
 * Created by david on 4/23/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    content: String,
    // here we are referencing a totally different schema (not just a subschema)
    // we use the {} object to show that we expect to have a single entry
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

var Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
//# sourceMappingURL=comment.js.map