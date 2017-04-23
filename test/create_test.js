const assert = require('assert');
// assert is part of mocha (mocha is used for testing)
const User = require('../src/user');


describe('creating records', () => {
   it('saves a user', (done) => {
        const joe = new User({name: 'Joe'});

        // this is how you save to the database
        joe.save()
            .then(() => {
                // has joe been saved successfully
                // isNew is a mocha function that data has been saved to the db
                // isNew === true means it hasn't been saved to the db
                assert(!joe.isNew);
                // done is a mocha function that tells mocha to move on
                done();
            });
   });
});