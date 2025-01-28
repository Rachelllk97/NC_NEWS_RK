const fetchTopics = require("../models/topics.models")


const getTopics = (request, response, next) => {
    const queries = request.query;
    console.log(queries, "<<<< line 6 of the controller")

    fetchTopics(queries)
    .then((topics) => {
        console.log(topics, "<<<< line 10 of the controller, topics retirned from fetch topics")
        if (!Array.isArray(topics)) {
            console.error("Expected an array of topics but got:", topics);
            return response.status(500).send({ error: "Internal Server Error" });
        }

        if (topics.length === 0) {
            return response.status(404).send({ message: "No topics found" });
        }

        response.status(200).send({ topics });
    })
    .catch((err) => {
        console.log(err, "<<<< line 14 of the controller");
        next(err);  
    });
}


module.exports = getTopics