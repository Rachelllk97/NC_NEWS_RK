const {fetchComments, addComment, fetchDelete} = require("../models/comments.models")

const getComments = (req, res, next) => {
    const {article_id} = req.params
    fetchComments(article_id)
    .then((comments) => {
        console.log(comments, "<<comments")
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
        res.status(201).send({comment})
    })
    .catch((err) => {
        next(err)
    })
}

const deleteComment = (req, res, next) => {
    const {comment_id} = req.params
    fetchDelete(comment_id)
    .then((comment) => {
        res.status(204).send({comment})
    })
    .catch((err) => {
        next(err)
    })
}






module.exports = {getComments, postComment, deleteComment}