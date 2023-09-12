import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
AWS.config.update({
  accessKeyId: process.env.ACCESSKEY,
  secretAccessKey: process.env.SECRETACCESSKEY,
});
const s3 = new AWS.S3();
const myBucket = process.env.BUCKETNAME;

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKETNAME,
    acl: "public-read",
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
export const handleImageUpload = (file) => {
  console.log("Error occurs in handleImageUpload")
  return new Promise((resolve, reject) => {
    upload.single("image")(file, null, async function (err) {
      if (err) {
        console.log("Error occured in image upload")
        reject(err);
        
      } else {
        resolve(file.location);
      }
    });
  });
};
