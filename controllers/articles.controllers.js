const {fetchArticleById, fetchArticles, updateVotes} = require("../models/articles.models")
const {validateOrder, validateSortBy, modifyArticles, buildSortQuery} = require("../utils")

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
  const { sort_by = "created_at", order = "desc", author, topic } = req.query;

  const validSortColumns = ["article_id", "title", "topic", "author", "created_at", "votes", "article_img_url", "comment_count"];
  const validOrderValues = ["asc", "desc"];

  if (!validSortColumns.includes(sort_by)) {
    return next({
      status: 400,
      msg: "Invalid sort query"
    });
  }

  if (!validOrderValues.includes(order.toLowerCase())) {
    return next({
      status: 400,
      msg: "Invalid order query"
    });
  }

    // validateSortBy()
    // validateOrder()

    fetchArticles(sort_by, order, author, topic)
      .then((articles) => {
        articles.map(({body, ...rest}) => rest)
        res.status(200).send({ articles });
      })
      .catch((err) => {
        next(err);  
      });
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