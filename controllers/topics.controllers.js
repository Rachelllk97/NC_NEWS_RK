const fetchTopics = require("../models/topics.models")


const getTopics = (request, response, next) => {
    fetchTopics()
    .then((topics) => {
        response.status(200).send({ topics });
    })
    .catch((err) => {
        next(err);  
    });
}

//request.params will extract the article id number and that will be passed into the model- look at the notes 

module.exports = getTopics