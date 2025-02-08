const {fetchArticleById, fetchArticles, updateVotes} = require("../models/articles.models")
const { modifyArticles, buildSortQuery} = require("../utils")

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
    const { sort_by = "created_at", order = "desc" } = req.query;
  
    try {
      const sortQuery = buildSortQuery(sort_by, order);
  
      fetchArticles(sort_by, order)
        .then((articles) => {
          const modifiedArticles = modifyArticles(articles, sort_by, order);
          res.status(200).send({ articles: modifiedArticles });
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  };


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