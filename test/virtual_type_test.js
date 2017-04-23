/**
 * Created by david on 4/23/17.
 */
const assert = require('assert');
const User = require('../src/user');

describe('virtual types', () => {
    //virtual fields / virtual types are only on the server NOT in the db
    it('postCount returns number of posts', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{title: 'Post Title'}]
        });

        joe.save()
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user.postCount === 1);
                done();
            });
    });
});