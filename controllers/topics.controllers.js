const {fetchTopics, fetchArticleById} = require("../models/topics.models")


const getTopics = (req, res, next) => {
    fetchTopics()
    .then((topics) => {
        res.status(200).send({ topics });
    })
    .catch((err) => {
        next(err);  
    });
}

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




//request.params will extract the article id number and that will be passed into the model- look at the notes 

module.exports = {getTopics, getArticleByID}