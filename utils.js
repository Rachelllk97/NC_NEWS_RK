
function modifyArticles(articles, sort_by, order){
    if(articles.length === 0){
        return articles
    }

    return articles
    .map(({body, ...rest}) => rest)
    .sort((a,b) =>  {
        const valueA = a[sort_by];  
        const valueB = b[sort_by];  


        if (valueA === undefined || valueB === undefined) {
            return 0;  
        }

     
        if (typeof valueA === 'number' && typeof valueB === 'number') {
            if (order === 'asc') {
                return valueA - valueB;  
            } else {
                return valueB - valueA;  
            }
        }

 
        if (typeof valueA === 'string' && typeof valueB === 'string') {
            if (order === 'asc') {
                return valueA.localeCompare(valueB);  
            } else {
                return valueB.localeCompare(valueA);  
            }
        }

        if (valueA instanceof Date && valueB instanceof Date) {
            if (order === 'asc') {
                return valueA - valueB;  
            } else {
                return valueB - valueA;  
            }
        }

  
        return 0;  
    });
}

const validColumns = [
    "article_id", "title", "topic", "author",
    "created_at", "votes", "article_img_url", "comment_count"
  ];
  
  const validateSortBy = (sort_by) => {
    if (!validColumns.includes(sort_by)) {
      throw { status: 400, msg: "Bad Request: Invalid sort_by column" };
    }
  };
  
  const validateOrder = (order) => {
    if (order) {
      const lowerCaseOrder = order.toLowerCase(); 
      if (lowerCaseOrder === "asc" || lowerCaseOrder === "desc") {
        return; 
      }
    }
    throw { status: 400, msg: "Bad Request: Invalid order value" };
  };
  
  const buildSortQuery = (sort_by, order) => {
    validateSortBy(sort_by);
    validateOrder(order);
  
    return `ORDER BY ${sort_by} ${order.toUpperCase()}`;
  };
module.exports = {modifyArticles, validateSortBy, validateOrder, buildSortQuery}



