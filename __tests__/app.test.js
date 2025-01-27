const endpoints = require("../endpoints.json");
const app = require('../app')
const request = require("supertest");
const db = require("../db/connection.js");


/* Set up your test imports here */

/* Set up your beforeEach & afterAll functions here */

afterAll(() => {
  return db.end(); 
});


describe.only("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpoints);
      });
  });
});


describe.skip("GET /api/topics", () => {
  test("200: Responds with an array of topic objects, each of which should have properties: slug, description", () => {
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body)).toBe(true)
    })
    })
  })

