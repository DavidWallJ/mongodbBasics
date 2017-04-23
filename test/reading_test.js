/**
 * Created by david on 4/21/17.
 */
const assert = require('assert');
// these asserts are for checking only
const User = require('../src/user');

describe('reading users out of the database', () => {

    beforeEach((done) => {
        // this joe variable is a global var just so we can call it outside of this function
        joe = new User({name: 'Joe'});
        joe.save()
            .then(() => done());
    });

    it('finds all users with the name of joe', (done) => {
        User.find({name: "Joe"})
            .then((users) => {
            // in moongoose _id is actually an objectId("_id"). run toString() to pull it out
                // it's not a raw string until you toString it
            assert(users[0]._id.toString() === joe._id.toString());
            done();
        });
    });

    it('find a user with a particular id', (done) => {
        User.findOne({ _id: joe._id })
            .then((user) => {
                assert(user.name === 'Joe');
                done();
            })
    });
});