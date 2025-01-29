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
    const query = `
        SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url,
        COUNT(comments.comment_id) AS comment_count
        FROM articles
        LEFT JOIN comments ON articles.article_id = comments.article_id
        GROUP BY articles.article_id   
        `
    return db.query(query)
    .then(({rows}) => rows)
}

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

module.exports = {fetchArticleById, fetchArticles, fetchComments}