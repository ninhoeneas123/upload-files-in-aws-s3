import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class FilesService {

  private s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY
  })

  async uploadAwsS3(file: any): Promise<string> {
    const urlKey = `filepath/${file.originalname}`;
    const params = {
      Body: file.buffer,
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: urlKey,
    };
    console.log(process.env.AWS_ACCESS_KEY_ID)
    const data = await this.s3
      .putObject(params)
      .promise()
      .then(
        data => {
          console.log(data)
          return urlKey;
        },
        err => {
          console.log(err);
          return err
        }
      )
      
    return data
  }

}
