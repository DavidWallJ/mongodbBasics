/**
 * Created by david on 4/22/17.
 */
const assert = require('assert');
// these asserts are for checking only
const User = require('../src/user');

describe('Deleting a user', () => {

    beforeEach((done) => {
        // this joe variable is a global var just so we can call it outside of this function
        joe = new User({name: 'Joe'});
        joe.save()
            .then(() => done());
    });

    // these are different methods of removing the same instance of a user

    it('model instance remove', (done) => {
        joe.remove()
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('model instance remove', (done) => {
        //remove a bunch of records with some given criteria
        User.remove({ name:'Joe' })
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findAndRemove', (done) => {
        User.findOneAndRemove({ name: 'Joe'})
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
});