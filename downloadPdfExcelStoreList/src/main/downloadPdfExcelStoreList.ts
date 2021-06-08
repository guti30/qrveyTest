import {APIGatewayProxyResult} from "aws-lambda";
import * as RESPONSE_TYPES from '../../../common/src/main/types/responseTypes';
import { LAMBDA_VARIABLES,S3_VARIABLES } from '../../../common/src/main/util/dbConfigurations';
import *  as dbHandler from '../../../common/src/main/db/commonDb';
import json2csv from 'json-2-csv';
import * as s3Upload from '../main/s3Config/s3UploadHandler'




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
            let pdf;
            csvUrl = await s3Upload.s3UploadHandler(csv,"csv");
            response.body = "url csv: " + csvUrl;
            pdfUrl = await s3Upload.s3UploadHandler(pdf,"pdf");
            response.body = "\nurl pdf: " + pdfUrl;


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