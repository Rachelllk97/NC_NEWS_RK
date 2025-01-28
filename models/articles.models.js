const db = require("../db/connection")


const fetchArticleById = (article_id) => {
    return db
    .query('SELECT * FROM articles WHERE article_id = $1', [article_id])
    .then(({rows}) => {
        const article = rows[0]
    if (!article) {
        return Promise.reject({
            status: 404,
            msg: "No article associated with this id number",
          })
    }
     return article
    })
}

const fetchArticles = () => {
    return db.query(`SELECT * FROM articles`)
    .then(({rows}) => {
        return rows
    })
}


module.exports = {fetchArticleById, fetchArticles}