import dotenv from "dotenv";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
dotenv.config();

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.ACCESSKEY,
    secretAccessKey: process.env.SECRETACCESSKEY,
  },
});
export const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.BUCKETNAME,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

export const handleImageUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }
  const uploadedFile = req.file;
  const image_url = uploadedFile.location;
  return image_url;
  res
    .status(200)
    .json({ message: "Image successfully uploaded", url: image_url });
};
