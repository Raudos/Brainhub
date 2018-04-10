const request = require("supertest");

const { dummyEvent } = require("./createEvent");

module.exports = app => {
  describe("GetEvent endpoint test.", () => {
    const agent = request(app);

    test("Should return details of event based on its id.", done => {
      agent.get("/events").expect(200).end((err, res) => {
        const id = res.body.events[0]._id;

        agent.get(`/event/${id}`).expect(200).end((err, res) => {
          if (err) {
            return done(err);
          }

          expect({...dummyEvent, __v: 0, _id: id}).toMatchObject(res.body.event);

          done();
        });
      });
    });
  });
};
