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

const addComment = (article_id, username, body) => {
    const createdAtString = new Date().toISOString()
    return db
    .query(`INSERT INTO comments (body, author, article_id, votes, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [body, username, article_id, 0, createdAtString]
    )
    .then(({rows}) => {
        console.log(rows, "<<< in the model")
        return rows[0]
    })


}

module.exports = {fetchComments, addComment}