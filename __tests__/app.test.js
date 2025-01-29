const endpoints = require("../endpoints.json");
const app = require('../app')
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js")
const testData = require("../db/data/test-data/index.js")


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
  test('return an array of objects containing all articles with body removed', () => {
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
          comment_count: expect.any(String),
      })
    })
  })
})
test('return the correct total count of all the comments with this article_id.', () => {
  return request(app)
  .get("/api/articles")
  .expect(200)
  .then(({body}) => {
    const article = body.articles[0]
    expect(article).toEqual({
        article_id: 3,
        title: 'Eight pug gifs that remind me of mitch',
        topic: 'mitch',
        author: 'icellusedkars',
        created_at: expect.any(String), 
        votes: 0,
        article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
        comment_count: '2'
    })
  })
})
test("should return the array of objects in descing order", () => {
  return request(app)
  .get("/api/articles")
  .expect(200)
  .then(({body}) => {
    const article = body.articles[0]
    expect(article).toEqual({
        article_id: 3,
        title: 'Eight pug gifs that remind me of mitch',
        topic: 'mitch',
        author: 'icellusedkars',
        created_at: expect.any(String),
        votes: 0,
        article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
        comment_count: '2'
      },
      {
        article_id: 6,
        title: 'A',
        topic: 'mitch',
        author: 'icellusedkars',
        created_at: expect.any(String),
        votes: 0,
        article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
        comment_count: '1'
      },
      {
        article_id: 2,
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        created_at: expect.any(String),
        votes: 0,
        article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
        comment_count: '0'
      },
      {
        article_id: 12,
        title: 'Moustache',
        topic: 'mitch',
        author: 'butter_bridge',
        created_at: expect.any(String),
        votes: 0,
        article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
        comment_count: '0'
      },
      {
        article_id: 13,
        title: 'Another article about Mitch',
        topic: 'mitch',
        author: 'butter_bridge',
        created_at: expect.any(String),
        votes: 0,
        article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
        comment_count: '0'
      },
      {
        article_id: 5,
        title: 'UNCOVERED: catspiracy to bring down democracy',
        topic: 'cats',
        author: 'rogersop',
        created_at: expect.any(String),
        votes: 0,
        article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
        comment_count: '2'
      },
      {
        article_id: 1,
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        created_at: expect.any(String),
        votes: 100,
        article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
        comment_count: '11'
      },
      {
        article_id: 9,
        title: "They're not exactly dogs, are they?",
        topic: 'mitch',
        author: 'butter_bridge',
        created_at: expect.any(String),
        votes: 0,
        article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
        comment_count: '2'
      },
      {
        article_id: 10,
        title: 'Seven inspirational thought leaders from Manchester UK',
        topic: 'mitch',
        author: 'rogersop',
        created_at: expect.any(String),
        votes: 0,
        article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
        comment_count: '0'
      },
      {
        article_id: 4,
        title: 'Student SUES Mitch!',
        topic: 'mitch',
        author: 'rogersop',
        created_at: expect.any(String),
        votes: 0,
        article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
        comment_count: '0'
      },
      {
        article_id: 8,
        title: 'Does Mitch predate civilisation?',
        topic: 'mitch',
        author: 'icellusedkars',
        created_at: expect.any(String),
        votes: 0,
        article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
        comment_count: '0'
      },
      {
        article_id: 11,
        title: 'Am I a cat?',
        topic: 'mitch',
        author: 'icellusedkars',
        created_at: expect.any(String),
        votes: 0,
        article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
        comment_count: '0'
      },
      {
        article_id: 7,
        title: 'Z',
        topic: 'mitch',
        author: 'icellusedkars',
        created_at: expect.any(String),
        votes: 0,
        article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
        comment_count: '0'

})
})})})


describe("GET /api/articles/:article_id/comments", () => {
  test("should an array of comments for the given article_id and contain correct properties", () => {
    return request(app)
    .get("/api/articles/3/comments")
    .expect(200)
    .then(({ body: { comments } }) => {
      expect(comments.length).toBe(2)
       comments.forEach((comment) => {
        expect(comment).toMatchObject({
          comment_id: expect.any(Number),
          votes: expect.any(Number), 
          created_at: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),   
          article_id: expect.any(Number),  
      })
    })
  })
  })
  test("should return comments in date order with most recent first", () => {
    return request(app)
    .get("/api/articles/3/comments")
    .expect(200)
    .then(({body: comments}) => {
      expect(comments).toEqual({
        comments:[{
        comment_id: 11,
        body: 'Ambidextrous marsupial',
        article_id: 3,
        author: 'icellusedkars',
        votes: 0,
        created_at: expect.any(String),   
      }, 
      {
      comment_id: 10,
        body: 'git push origin master',
        article_id: 3,
        author: 'icellusedkars',
        votes: 0,
        created_at: expect.any(String),   
      }
    ]})
  })
  })
  test("should throw correct error if invalid article_id input", () => {
    return request(app)
    .get("/api/articles/hello/comments")
    .expect(400)
    .then((response) => {
     expect(response.body.error).toBe("Bad Request");
        });
  })
  test("should throw correct error if article_id does not exist", () => {
  return request(app)
  .get("/api/articles/20/comments")
  .expect(404)
  .then((response) => {
  expect(response.body.error).toBe("No comments associated with this id number");
  })
  })
})

// describe("POST /api/articles/:article_id/comments", () => {
//   test("should add a comment for an article and return the post", () => {
//     const newComment = {
//       body: "this is a comment",
//       username: "rachel"
//     }
//       return request(app)
//         .post('/api/articles/3/comments')
//         .send(newComment)
//         .expect(201)
//         .then((response) => {
//           expect(response.body.comment.comment_id).toBe('number');
//           expect(response.body.comment.username).toBe("rachel");
//           expect(response.body.comment.body).toBe("this is a comment");
//         });
//   })
// })




