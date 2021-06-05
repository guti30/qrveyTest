import s3Controller from '../config/controlador_s3'
import { S3CreateEvent } from 'aws-lambda';
import { ResponseModel } from '../models/models';
import * as RESPONSE_TYPES from '../types/responseTypes';

/**
 * @name downloadPdfExcelStoreListHandler
 * @param body Even
 * @description Consult the data in Dynamo and generate a pdf and excel file with the info
 */
export async function downloadPdfExcelStoreListHandler(body: S3CreateEvent) {
    let response: ResponseModel = new ResponseModel();
    console.log("[LAMBDA_EVENT] - Incomming S3 event", JSON.stringify(body));
    try {


    } catch (err) {
        console.log(err);
        let message = "[PROCESSING_FILES][PROCESSING_FILES_CONTROLLER][CREATE_TRANSFER] - Error";
        response.setResponse(RESPONSE_TYPES.NOT_FOUND, false, message);
    }
    return response;
}