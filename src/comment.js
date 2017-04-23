/**
 * Created by david on 4/23/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: String,
    // here we are referencing a totally different schema (not just a subschema)
    // we use the {} object to show that we expect to have a single entry
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;