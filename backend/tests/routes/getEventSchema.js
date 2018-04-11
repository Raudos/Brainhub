const request = require("supertest");
const R = require("ramda");

// Models
const { EventSchema } = require("../../models/event");

function removeUnparseableValues(obj) {
  const newObj = R.clone(obj);

  Object.keys(newObj).forEach(key => {
    const field = newObj[key];

    delete field.type;
    field.validate ? field.validate = {message: field.validate.message} : null;
  });

  return newObj;
};

module.exports = app => {
  describe("EventSchema endpoint test.", () => {
    test("Should return Event schema.", done => {
      request(app)
        .get("/eventSchema")
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(removeUnparseableValues(EventSchema.obj)).toMatchObject(res.body.EventSchema);

          done();
        })
    });
  });
};
