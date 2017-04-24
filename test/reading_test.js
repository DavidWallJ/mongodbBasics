/**
 * Created by david on 4/21/17.
 */
const assert = require('assert');
// these asserts are for checking only
const User = require('../src/user');

describe('reading users out of the database', () => {
    let joe, maria, alex, zach;
    beforeEach((done) => {
        // this joe variable is a global var just so we can call it outside of this function
        alex = new User({name: 'Alex'});
        joe = new User({name: 'Joe'});
        maria = new User({name: 'Maria'});
        zach = new User({name: 'Zach'});

        Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
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

    it('can skip and limit the result set', (done) => {
        // passing in a {} is like *.  It means no filter.
        User.find({})
        //this sort means sort by name in acceding order. -1 for descending
            .sort({name: 1})
            .skip(1)
            .limit(2)
            .then((users) => {
                assert(users.length === 2);
                assert(users[0].name === "Joe" && users[1].name === "Maria");
                done();
            });
    });
});