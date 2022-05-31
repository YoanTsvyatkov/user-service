const { resourcesBucket } = require("./aws-s3");

const uploadResource = (fileName, fileContent) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${fileName}`,
            Body: fileContent
        }
    
        resourcesBucket.upload(params, (err, data) => {
            if (err) {
                reject(err)
            }
    
            resolve(data)
        });
    })
};

exports.uploadResource = uploadResource
