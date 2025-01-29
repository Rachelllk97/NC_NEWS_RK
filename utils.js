
function modifyArticles(articles){
    if(articles.length === 0){
        return articles
    }

    return articles
    .map(({body, ...rest}) => rest)
    .sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
}


module.exports = {modifyArticles}



