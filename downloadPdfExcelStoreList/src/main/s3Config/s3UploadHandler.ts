import * as AWS from 'aws-sdk';
import { S3_VARIABLES } from '../../../../common/src/main/util/dbConfigurations';
import { uuid } from 'uuidv4';
import { String } from 'aws-sdk/clients/cloudwatchevents';



export async function s3UploadHandler(data: any,dataType:string) {
    let s3 =  new AWS.S3();
    const bucketParamsCsv = {
        Bucket: S3_VARIABLES.s3Name,
        Key: "files/" + uuid() + "."+dataType,
        Body: data,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: 'application/csv',
        ContentDisposition: 'inline'
    };
    let dataCsv = await s3.upload(bucketParamsCsv).promise();
    return dataCsv.Location;

}