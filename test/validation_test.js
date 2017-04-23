/**
 * Created by david on 4/22/17.
 */
const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
   it('requires a user name', () => {
       const user = new User({name: undefined});
       // validate is a synchronous process; its happening instantly we don't to wait.  If it took a while we'd need asynchronous validation and would use validate()

       const result = user.validateSync();

       // **NOTE** this is the route to the error message that you made in the schema
       // es6 equivalent 'const { message } = result.errors.name;'
       // because the const name is the same as the property name
       const message = result.errors.name.message;

       assert(message === 'User name required.');
   });

   it('requires a user name longer than 2 characters', () => {
        const user = new User({name: 'Al'});
        const result = user.validateSync();
        const message = result.errors.name.message;

        assert(message === "Name must be longer than 2 characters.");
   });

   it('disallows invalid records from being saved', (done) => {
        const user = new User({name: 'Al'});
        user.save()
            .catch((fromSave) => {
                const message = fromSave.errors.name.message;
                assert(message === 'Name must be longer than 2 characters.');
                done();
            });
   });
});