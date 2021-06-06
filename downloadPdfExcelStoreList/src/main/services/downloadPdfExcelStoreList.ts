import s3Controller from '../config/controlador_s3'
import { S3CreateEvent } from 'aws-lambda';
import {APIGatewayProxyResult} from "aws-lambda";
import * as RESPONSE_TYPES from '../../../../common/src/main/types/responseTypes';
import { LAMBDA_VARIABLES } from '../../../../common/src/main/util/dbConfigurations';
import *  as dbHandler from '../../../../common/src/main/db/commonDb';
import json2csv from 'json-2-csv';
import fs from 'fs';


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
 
    try {
        const dynamoRecord: any = await dbHandler.getAllRecord();
        if(dynamoRecord.length>0){
            const csv = await json2csv.json2csvAsync(dynamoRecord);
            fs.writeFileSync('downloadPdfExcelStoreList/src/main/recordsCsv.csv', csv);
            response.body = csv;

        }else{
            response.body =JSON.stringify(dynamoRecord);
        }
        response.statusCode = RESPONSE_TYPES.OK;
        


    } catch (err) {
        console.log(err);
        response.body = JSON.stringify(err);
        response.statusCode = RESPONSE_TYPES.NOT_FOUND;
       
    }
    return response;
}