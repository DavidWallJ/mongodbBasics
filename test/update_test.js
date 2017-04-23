/**
 * Created by david on 4/22/17.
 */
const assert = require('assert');
// these asserts are for checking only
const User = require('../src/user');

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
       joe = new User({name: 'Joe', likes: 5});
       joe.save()
           .then(() => done());
    });


    function assertName(operation, done) {
        operation
            .then(() => User.find({})) // no critera; get all
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            });
    }

    // these both do the same thing

    it('instance type using set n save', (done) => {
        joe.set('name', "Alex");
        assertName(joe.save(), done);
    });

    it('a model instance can update', (done) => {
        assertName(joe.update({name: 'Alex'}), done);
    });

    it('a model class can update', (done) => {
        assertName(
            User.update({name: 'Joe'}, {name: 'Alex'}),
            done
        );
    });

    it('a model class can update one record', (done) => {
        assertName(
            User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}),
            done
        );
    });

    it('a model class can with an id and update', (done) => {
        assertName(
            User.findByIdAndUpdate(joe._id, {name: 'Alex'}),
            done
        );
    });

    // part 2

    it('increment user likes by 1', (done) => {
        let currentCount = joe.likes;
        // $inc is an update operator.  you can also use it to decrement
        User.update({name: 'Joe'}, { $inc: {likes: 1} })
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user.likes === currentCount + 1);
                done();
        });
    });
});