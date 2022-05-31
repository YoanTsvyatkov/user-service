const { S3 } = require('aws-sdk');
const dotenv = require("dotenv");
const path  =require( "path");
const envPath = path.resolve(__dirname, "..", ".env")

dotenv.config({ path: envPath });

const resourcesBucket = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

exports.resourcesBucket = resourcesBucket