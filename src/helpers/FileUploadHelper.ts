import * as AWS from 'aws-sdk';
import { env } from "../environments/Env"
const fs = require('fs');
class FileUploadHelper {

    private s3 = new AWS.S3({
        accessKeyId: env().awsAccessKey,
        secretAccessKey: env().awsSecretKey,
        signatureVersion: 'v4',
        region: 'ap-south-1'
    });

    /**
     * upload images or files in S3 bucket
     * @param image 
     * @param paths 
     * @returns image url
     */
    public async uploadInS3(image: any, paths?: any) {

        let path: any = 'profile_pictures';
        if (paths) {
            path = paths
        }
        console.log('upload s3 image called......');
        const imageRemoteName = `${path}/image_${new Date().getTime()}.png`;
        console.log('inside s3')
        return this.s3.putObject({
            Bucket: env().s3Bucket,
            Body: fs.readFileSync(image.filepath),
            ContentType: image.mimetype,
            Key: imageRemoteName,
            ACL: 'public-read'
        })
            .promise()
            .then(async response => {
                console.log(response);
                console.log('image remote name', imageRemoteName);
                return imageRemoteName;
            })
            .catch(err => {
                console.log('failed:', err)
                return false;
            })
    }

    /**
     * Delete image from bucket
     * @param path 
     * @returns void
     */
    public deleteFromS3(path: any) {
        return this.s3.deleteObject({
            Bucket: env().s3Bucket,
            Key: path
        }, function (err, data) {
            console.log(data);
        })
    }

    public getSignedS3Urls(path: string): string {
        const objectParams = { Bucket: env().s3Bucket, Key: path };
        const res = this.s3.getSignedUrl('getObject', objectParams);
        return res;
    }
}

export default new FileUploadHelper();