const db = require("../db/connection")

const fetchComments = (article_id) => {
    return db
    .query('SELECT * FROM comments WHERE article_id = $1 ORDER BY comments.created_at DESC;  ', [article_id])
    .then(({rows}) => {
    if (rows.length === 0) {
        return Promise.reject({
            status: 404,
            msg: "No comments associated with this id number",
          })
    }
     return rows
    })
}


module.exports = {fetchComments}