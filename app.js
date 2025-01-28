const express = require("express");
const app = express();
const endpoints = require("./endpoints.json")
const {getTopics, getArticleByID} = require("./controllers/topics.controllers")

app.get("/api", (req, res) => {
    res.status(200).send({ endpoints})
});

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleByID)

app.all("*", (req, res) => {
    res.status(404).send({error: "Endpoint not found"})
})


module.exports = app