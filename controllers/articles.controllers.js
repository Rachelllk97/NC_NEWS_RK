const {fetchArticleById, fetchArticles, updateVotes} = require("../models/articles.models")
const { modifyArticles } = require("../utils")

const getArticleByID = (req, res, next) => {
    const {article_id} = req.params

    fetchArticleById(article_id)
    .then((article) => {
        res.status(200).send({article})
    })
    .catch((err) => {
        next(err)
    })
}

const getArticles = (req, res, next) => {
    fetchArticles()
    .then((articles) => {
        const modifiedArticles = modifyArticles(articles)
        res.status(200).send({articles: modifiedArticles})
    })
    .catch((err) => {
        next(err)
    })
}

const patchVotes = (req, res, next) => {
    const {article_id} = req.params
    const {inc_votes} = req.body

    updateVotes(article_id, inc_votes)
    .then((updatedArticle) => {
        res.status(200).send(updatedArticle)
    })
    .catch((err) => {
        next(err)
    })
}



module.exports = {getArticleByID, getArticles, patchVotes}