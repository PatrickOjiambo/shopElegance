import dotenv from "dotenv";
dotenv.config();
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
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, file.originalname);
      },
    }),
  });

/**
 * 
 * @param {png} file - The file to be uploaded
 */
export const handleImageUpload =(file)=>{
    return new Promise((resolve, reject) => {
        upload.single('image')(file, null, async function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(file.location);
          }
        });
      });
}
module.exports = {handleImageUpload};
