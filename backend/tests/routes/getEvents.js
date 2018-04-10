const request = require("supertest");

const { dummyEvent } = require("./createEvent");

module.exports = app => {
  describe("EventsList endpoint test.", () => {
    test("Should return array of Events.", done => {
      request(app)
        .get("/events")
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body.events.length).toBe(1);

          const eventWithoutId = {...res.body.events[0]};
          delete eventWithoutId._id;
          expect(eventWithoutId).toMatchObject(dummyEvent);

          done();
        })
    });
  });
};
