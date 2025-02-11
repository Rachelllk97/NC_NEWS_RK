const db = require("../db/connection")
const {buildSortQuery} = require("../utils")

const fetchArticleById = (article_id) => {
    return db
    .query(
        `SELECT articles. *, 
        COUNT(comments.comment_id) AS comment_count
        FROM articles
        LEFT JOIN comments ON articles.article_id = comments.article_id
        WHERE articles.article_id = $1
        GROUP BY articles.article_id`, 
        [article_id]
    )
    .then(({ rows }) => {
        const article = rows[0];
        // if (!article) {
        //     return Promise.reject({
        //         status: 404,
        //         msg: "No article associated with this id number",
        //     });
        // }
        return article;

    });
}


const fetchArticles = (sort_by, order, author, topic) => {
    const sortQuery = buildSortQuery(sort_by, order);  
    
    let query = `
      SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url,
      COUNT(comments.comment_id) AS comment_count
      FROM articles
      LEFT JOIN comments ON articles.article_id = comments.article_id
    `;
    
    const queryValues = [];
  
    if (topic) {
      query += ` WHERE articles.topic = $1`;
      queryValues.push(topic);
    }
  
    if (author) {
      if (topic) {
        query += ` AND articles.author = $2`;
        queryValues.push(author);
      } else {
        query += ` WHERE articles.author = $1`;
        queryValues.push(author);
      }
    }
  
    query += ` GROUP BY articles.article_id ${sortQuery};`;
    
    return db.query(query, queryValues)
      .then(({ rows }) => {
        console.log(rows)
        return rows
})}



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