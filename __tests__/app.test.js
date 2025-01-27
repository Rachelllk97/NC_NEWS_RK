const endpoints = require("../endpoints.json");
const app = require('../app')
const request = require("supertest");
const db = require("../db/connection.js");


/* Set up your test imports here */

/* Set up your beforeEach & afterAll functions here */

afterAll(() => {
  return db.end(); 
});


describe.skip("GET /api", () => {
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


  describe("404", () => {
    test('should respond with 404 and a message of "Endpoint not found"', ()=> {
      return request(app)
      .get("/api/nope")
      .expect(404)
      .then((response) => {
        console.log(response.body)
        expect(response.body.error).toBe("Endpoint not found")
      })
    })
  })

