const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.PASSWORD,
  database: process.env.DBNAME,
});



const promiseConnection = pool.promise();

const createTables = [
`
CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    username VARCHAR(45) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(200) NOT NULL,
    phone_number varchar(50) NOT NULL UNIQUE
    );

`,

`
CREATE TABLE IF NOT EXISTS Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    name VARCHAR(45) NOT NULL
);

`
,
`
CREATE TABLE IF NOT EXISTS Orders(
    order_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    user_id INT,
    order_date DATETIME NOT NULL,
    status ENUM("pending", "shipped", "delivered"),
    total_amount FLOAT,
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
`
,
`
CREATE TABLE IF NOT EXISTS Products(
    product_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    name VARCHAR(45) NOT NULL,
    description VARCHAR(45) NOT NULL,
    price FLOAT NOT NULL,
    stock_quantity VARCHAR(45) NOT NULL,
    category_id INT,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Categories (category_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
`
,
`
CREATE TABLE IF NOT EXISTS Order_items(
    order_item_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    item_price FLOAT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders (order_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products (product_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
`
,
`
CREATE TABLE IF NOT EXISTS Reviews(
    review_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    user_id INT,
    product_id INT,
    rating FLOAT NOT NULL,
    comment VARCHAR(45),
    created_at DATETIME NOT NULL
);
`
,
`
CREATE TABLE IF NOT EXISTS Images(
    image_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    product_id INT,
    url VARCHAR(100) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products (product_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE

);
`,
]

Promise.all(createTables.map(query=>{
    promiseConnection.query(query)
    .then(()=>{console.log("Tables created successfully")})
    .catch(error=>{
        console.log("Error", error);
    })

}))

module.exports = pool;
