const db = require("../db/connection")


const fetchTopics = (queries) => {
    const description = queries.description;
    const slug = queries.slug;

    let SQLString = `SELECT * FROM topics`
    const args = []

    return db.query(SQLString, args)
    .then(({ rows}) => {
        console.log(rows, "<<<< rows in fetchTopics, line 12");
        return rows 
    })
    .catch((err) => {
        console.error("Error fetching topics:", err);
        throw err;
    });
}

module.exports = fetchTopics