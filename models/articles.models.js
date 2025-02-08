const db = require("../db/connection")
const {buildSortQuery} = require("../utils")


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

const fetchArticles = (sort_by, order) => {

    const sortQuery = buildSortQuery(sort_by, order);

    const query = `
        SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url,
        COUNT(comments.comment_id) AS comment_count
        FROM articles
        LEFT JOIN comments ON articles.article_id = comments.article_id
        GROUP BY articles.article_id   
         ${sortQuery};
        `
return db.query(query)
        .then(({ rows }) => {
            return rows;
    } )
}


const updateVotes = (article_id, inc_votes) => {
    const query = 
    `UPDATE articles 
     SET votes = votes + $1
     WHERE article_id = $2
     RETURNING *;`
    return db.query(query, [inc_votes, article_id])
    .then(({rows}) => {
            if (rows.length === 0) {
              return Promise.reject({ status: 404, msg: "Not Found"});
            }
        return rows[0]
})
}

module.exports = {fetchArticleById, fetchArticles, updateVotes}