

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
  
  const buildSortQuery = (sort_by = "created_at", order = "desc") => {
    const validSortColumns = ["article_id", "title", "topic", "author", "created_at", "votes", "article_img_url", "comment_count"];

    if (!validSortColumns.includes(sort_by)) {
      throw new Error("Invalid sort_by column");
    }
  
    if (!["asc", "desc"].includes(order.toLowerCase())) {
      throw new Error("Invalid order value. It should be either 'asc' or 'desc'.");
    }
  
    return `ORDER BY created_at ${order.toUpperCase()}`

  }

    module.exports = {buildSortQuery, validateOrder, validateSortBy};