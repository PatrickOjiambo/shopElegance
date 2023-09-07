const pool = require("./createdb")
require("dotenv").config()
const multer = require("multer")
const multerS3 = require("multer-s3")
const AWS = require("aws-sdk")
AWS.config.update({
    accessKeyId: process.env.ACCESSKEY,
    secretAccessKey: process.env.SECRETACCESSKEY
})
const s3 = new AWS.S3()
const myBucket = process.env.BUCKETNAME
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: myBucket,
        acl:"public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb){
            cb(null, file.originalname)
        }
    })
})
/**
 * Set up the routes to handle the uploading of files.
 */


let create_Categories = `
INSERT INTO Categories(name)VALUES();
`
let category_id = `
SELECT category_id FROM Categories 
WHERE name = ${category_name};
`
let createProduct = `
INSERT INTO TABLE Products(name, description, price, stock_quantity, category_id, created_at, updated_at)
VALUES();
`