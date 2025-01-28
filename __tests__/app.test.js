const endpoints = require("../endpoints.json");
const app = require('../app')
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js")
const testData = require("../db/data/test-data/index.js")


/* Set up your test imports here */

/* Set up your beforeEach & afterAll functions here */

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end(); 
});


describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpoints);
      });
  });
});


describe("GET /api/topics", () => {
    test("200: Responds with an array of topic objects, each object in the array should have properties: slug, description", () => {
      return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body: { topics } }) =>{
        expect(topics.length).toBe(3)
        topics.forEach((topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),    
        })
      })
    })
  })
})

describe("GET /api/articles/:article_id", () => {
    test("200: get an article by its id with correct properties", () => {
      return request(app)
      .get("/api/articles/4")
      .then(({body}) => {
      const article = body.article
        expect(article).toMatchObject({
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          article_img_url: expect.any(String),
        })
      })
  })
    test("get correct article for given article_id", () => {
      return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then(({body}) => {
        const article = body.article
        expect(article).toEqual({
          article_id: 3,
          title: "Eight pug gifs that remind me of mitch",
          topic: "mitch",
          author: "icellusedkars",
          body: "some gifs",
          created_at: expect.any(String),
          votes: 0,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        })
      })
    })
      test("400: id not a number", () => {
        return request(app)
          .get("/api/articles/hello")
          .expect(400)
          .then((response) => {
            expect(response.body.error).toBe("Bad Request");
          });
      });
      test("404: no article with that id number", () => {
        return request(app)
        .get("/api/articles/20")
        .expect(404)
        .then((response) => {
          expect(response.body.error).toBe("No article associated with this id number");
        })
      })

  });

  describe("404", () => {
    test('should respond with 404 and a message of "Endpoint not found"', ()=> {
      return request(app)
      .get("/api/nope")
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe("Endpoint not found")
      })
    })
  })

describe('GET /api/articles', () => {
  test('return an array of objects containing all articles', () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then(({ body: { articles } }) =>{
      expect(articles.length).toBe(13)
      articles.forEach((article) => {
        expect(article).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),   
          article_id: expect.any(Number),  
          topic: expect.any(String), 
          created_at: expect.any(String), 
          votes: expect.any(Number), 
          article_img_url: expect.any(String), 
          comment_count: expect.any(Number),
      })
    })
  })
})
})

