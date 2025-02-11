// const {modifyArticles} = require("../utils")
// const testData = require("../db/data/test-data")

// describe("modifyArticles", () => {
//     test("should return empty array when empty array passed in", () => {
//         const input = []
//         const output = modifyArticles(input)
//         expect(output).toEqual([])
//     })
//     test("should remove the body property from article objects", () => {
//         const input = [
//             {
//               title: "Living in the shadow of a great man",
//               topic: "mitch",
//               author: "butter_bridge",
//               body: "I find this existence challenging",
//               created_at: 1594329060000,
//               votes: 100,
//               article_img_url:
//                 "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//             }]
//         const output = modifyArticles(input)
//         expect(output).toEqual([
//             {
//               title: "Living in the shadow of a great man",
//               topic: "mitch",
//               author: "butter_bridge",
//               created_at: 1594329060000,
//               votes: 100,
//               article_img_url:
//                 "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//             }])       
//     })
//     test("should sort articles in descending order", () => {
//       const input =  [
//             {
//               body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
//               votes: 16,
//               author: "butter_bridge",
//               article_id: 9,
//               created_at: 1586179020000,
//             },
//             {
//               body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
//               votes: 14,
//               author: "butter_bridge",
//               article_id: 1,
//               created_at: 1604113380000,
//             },
//             {
//               body: "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
//               votes: 100,
//               author: "icellusedkars",
//               article_id: 1,
//               created_at: 1583025180000,
//             }]
//             const output = modifyArticles(input)
//             expect(output).toEqual([ {
//                 votes: 14,
//                 author: "butter_bridge",
//                 article_id: 1,
//                 created_at: 1604113380000,
//               },
//               {
//                 votes: 16,
//                 author: "butter_bridge",
//                 article_id: 9,
//                 created_at: 1586179020000,
//               },
//               {
//                 votes: 100,
//                 author: "icellusedkars",
//                 article_id: 1,
//                 created_at: 1583025180000,
//               }
//             ])
//     })
//     test("function should not mutate the input", () => {
//         const input =  [
//             {
//               body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
//               votes: 16,
//               author: "butter_bridge",
//               article_id: 9,
//               created_at: 1586179020000,
//             },
//             {
//               body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
//               votes: 14,
//               author: "butter_bridge",
//               article_id: 1,
//               created_at: 1604113380000,
//             }]
//         modifyArticles(input)
//         expect(input).toEqual( [
//             {
//               body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
//               votes: 16,
//               author: "butter_bridge",
//               article_id: 9,
//               created_at: 1586179020000,
//             },
//             {
//               body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
//               votes: 14,
//               author: "butter_bridge",
//               article_id: 1,
//               created_at: 1604113380000,
//             }])
//     })
//     test("output should return a different reference in memory to input", () => {
//         const input =  [
//             {
//               body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
//               votes: 16,
//               author: "butter_bridge",
//               article_id: 9,
//               created_at: 1586179020000,
//             },
//             {
//               body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
//               votes: 14,
//               author: "butter_bridge",
//               article_id: 1,
//               created_at: 1604113380000,
//             }]
//         const output = modifyArticles(input)
//         expect(input).not.toBe(output)
//     })
// })


