SELECT Products.*, Images.image, AVG(Reviews.rating) as average_rating
FROM Products
LEFT JOIN Images ON Products.product_id = Images.product_id
LEFT JOIN Reviews ON Products.product_id = Reviews.product_id
GROUP BY Products.product_id, Images.image;

SELECT Products.product_id as id, Products.name as name, Products.price as price, Images.url as image, AVG(Reviews.rating) as rating, COUNT(Reviews.review_id) as comments_count
FROM Products
LEFT JOIN Images ON Products.product_id = Images.product_id
LEFT JOIN Reviews ON Products.product_id = Reviews.product_id
GROUP BY Products.product_id, Products.name, Products.price, Images.url;