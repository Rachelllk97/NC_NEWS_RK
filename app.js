const express = require("express");
const app = express();
const endpoints = require("./endpoints.json")
const {getTopics} = require("./controllers/topics.controllers")
const {getArticleByID, getArticles} = require("./controllers/articles.controllers")

app.get("/api", (req, res) => {
    res.status(200).send({ endpoints})
});

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleByID)

app.get("/api/articles", getArticles)

app.all("*", (req, res) => {
    res.status(404).send({error: "Endpoint not found"})
})

app.use((err, req, res, next) => {  
    if (err.code === "22P02" || err.code === "23502") {
      res.status(400).send({ error: "Bad Request" });
    } else {
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