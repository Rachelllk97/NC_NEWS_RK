const {fetchComments, addComment} = require("../models/comments.models")

const getComments = (req, res, next) => {
    const {article_id} = req.params
    fetchComments(article_id)
    .then((comments) => {
        res.status(200).send({comments})
    })
    .catch((err) => {
        next(err)
    })
}

const postComment = (req,res,next) => {
    const {article_id} = req.params
    const {username, body} = req.body

    addComment(article_id, username, body)
    .then((comment) => {
        console.log(comment, "<<< in the controller")
        res.status(201).send({comment})
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = {getComments, postComment}