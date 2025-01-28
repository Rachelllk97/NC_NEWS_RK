const db = require("../db/connection")


const fetchTopics = () => {
    return db.query(`SELECT * FROM topics`)
    .then(({ rows}) => {
        return rows 
    })
}



//i'll need a check to make sure ive got the rows, if statement for if rows are 0, promise.reject()

module.exports = {fetchTopics}