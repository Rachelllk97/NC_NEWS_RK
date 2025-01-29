const {fetchComments} = require("../models/comments.models")

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
    
}

module.exports = {getComments, postComment}