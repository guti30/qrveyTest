import { S3CreateEvent } from 'aws-lambda';
import {APIGatewayProxyResult} from "aws-lambda";
import * as RESPONSE_TYPES from '../../../common/src/main/types/responseTypes';
import { LAMBDA_VARIABLES,S3_VARIABLES } from '../../../common/src/main/util/dbConfigurations';
import *  as dbHandler from '../../../common/src/main/db/commonDb';
import json2csv from 'json-2-csv';
import * as AWS from 'aws-sdk';
import { uuid } from 'uuidv4';



/**
 * @name downloadPdfExcelStoreListHandler
 * @param body Even
 * @description Consult the data in Dynamo and generate a pdf and excel file with the info
 */
export async function downloadPdfExcelStoreListHandler() {
    let response: APIGatewayProxyResult = {
        statusCode: 500,
        body: "",
        headers: LAMBDA_VARIABLES.LAMBDA_RESPONSE_HEADERS
    }
    let csvUrl:string;
    let pdfUrl:string;
    try {
        const dynamoRecord: any = await dbHandler.getAllRecord();
        if(dynamoRecord.length>0){
            const csv = await json2csv.json2csvAsync(dynamoRecord);
            response.body = csv;
            let s3 =  new AWS.S3();
            const bucketParams = {
                Bucket: S3_VARIABLES.s3Name,
                Key: "files/" + uuid() + ".csv",
                Body: csv,
                ACL: 'public-read',
                ContentEncoding: 'base64',
                ContentType: 'application/csv',
                ContentDisposition: 'inline'
            };
            let data = await s3.upload(bucketParams).promise();
            csvUrl = data.Location;
            response.body = "url csv: " + csvUrl;

        }else{
            response.body =JSON.stringify(dynamoRecord);
            console.log(response);
        }
        response.statusCode = RESPONSE_TYPES.OK;
        


    } catch (err) {
        console.log(err);
        response.body = JSON.stringify(err);
        response.statusCode = RESPONSE_TYPES.NOT_FOUND;
       
    }
    return response;
}