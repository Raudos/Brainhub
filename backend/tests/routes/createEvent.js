const request = require("supertest");
const moment = require('moment');

const dummyEvent = {
  firstName: "Piotr",
  lastName: "Sklepiński",
  email: "sklepinski.p@gmail.com",
  eventDate: moment(new Date("2018.10.21")).format("X")
};

const createEventTest = app => {
  describe("Tests for event creation", () => {
    test("should create new event", done => {
      request(app)
        .post("/createEvent")
        .send(dummyEvent)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          done();
        })
    });

    test("should not create new event because of Email validation", done => {
      request(app)
        .post("/createEvent")
        .send({
          firstName: "Piotr",
          lastName: "Sklepiński",
          email: "To jest email",
          eventDate: "2018.10.10"
        })
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          done();
        })
    });

    test("should not create new event because of Date validation", done => {
      request(app)
        .post("/createEvent")
        .send({
          firstName: "Piotr",
          lastName: "Sklepiński",
          email: "sklepinski.p@gmail.com",
          eventDate: "2017.10.10"
        })
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          done();
        })
    });

    test("should not create new event because of First Name validation", done => {
      request(app)
        .post("/createEvent")
        .send({
          firstName: "",
          lastName: "Sklepiński",
          email: "sklepinski.p@gmail.com",
          eventDate: "2018.10.10"
        })
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          done();
        })
    });

    test("should not create new event because of Last Name validation", done => {
      request(app)
        .post("/createEvent")
        .send({
          firstName: "Piotr",
          lastName: "",
          email: "sklepinski.p@gmail.com",
          eventDate: "2018.10.10"
        })
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          done();
        })
    });
  });
};

module.exports = {
  dummyEvent,
  createEventTest
};
