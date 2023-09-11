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
export const upload = multer({
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
