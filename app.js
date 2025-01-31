const express = require("express");
const app = express();
const endpoints = require("./endpoints.json")
const {getTopics} = require("./controllers/topics.controllers")
const {getArticleByID, getArticles, patchVotes} = require("./controllers/articles.controllers")
const {getComments, postComment, deleteComment}  = require("./controllers/comments.controllers")
const {getUsers} = require("./controllers/users.controllers")

app.use(express.json());


app.get("/api", (req, res) => {
    res.status(200).send({ endpoints})
});

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleByID)

app.get("/api/articles", getArticles)

app.get("/api/articles/:article_id/comments", getComments)

app.post("/api/articles/:article_id/comments", postComment)

app.patch("/api/articles/:article_id", patchVotes)

app.delete("/api/comments/:comment_id", deleteComment)

app.get("/api/users", getUsers)

app.all("*", (req, res) => {
    res.status(404).send({error: "Endpoint not found"})
})

app.use((err, req, res, next) => { 
    if (err.code === "22P02" || err.code === "23502") {
      res.status(400).send({ error: "Bad Request" });
    }
    else if (err.code === "23503" ){
        res.status(404).send({ error: "Not Found" });

     } else{
      next(err); 
    }
  });
  
  app.use((err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({error:err.msg})
    } else {
      next(err);
    }
  });
  
  app.use((err, req, res, next) => {
    console.log(err, "<<< you havent handled this error yet");
    res.status(500).send({ error: "Internal Server Error" });
  });
  


module.exports = app