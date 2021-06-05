import { ResponseModel } from '../models/models';
import * as RESPONSE_TYPES from '../types/responseTypes';
import *  as dbHandler from '../../../../common/src/main/db/commonDb';
import { DB_VARIABLES } from '../../../../common/src/main/util/dbConfigurations';

const UUID = require('uuid');
const TABLE_NAME = DB_VARIABLES.tableName;


/**
 * @name postDynamoHandler
 * @param body Even
 * @description Insert a element in Dynamo
 */
export async function postDynamoHandler(event: any) {
    let body = JSON.parse(event.body);
    console.log(body);
    let uid = UUID.v4();
    body.id = uid; 
    let response: ResponseModel = new ResponseModel();
    console.log("[LAMBDA_EVENT] - Incomming S3 event", JSON.stringify(body));
    try {
        const dynamoRecord: any = await dbHandler.putRecord(TABLE_NAME,body);
        response.setResponse(RESPONSE_TYPES.OK, true, RESPONSE_TYPES.SUCCESS,dynamoRecord);
        
    } catch (err) {
        console.log(err);
        let message = "[PROCESSING_FILES][PROCESSING_FILES_CONTROLLER][CREATE_TRANSFER] - Error";
        response.setResponse(RESPONSE_TYPES.NOT_FOUND, false, message);
    }
    return response;
}

/**
 * @name getDynamoHandler
 * @param body Even
 * @description Consult an element in Dynamo
 */
 export async function getDynamoHandler(body: any) {
    let response: ResponseModel = new ResponseModel();
    console.log("[LAMBDA_EVENT] - Incomming S3 event", JSON.stringify(body));
    try {

        const dynamoRecord: any = await dbHandler.getRecord(TABLE_NAME,body.queryStringParameters["id"]);
        response.setResponse(RESPONSE_TYPES.OK, true, RESPONSE_TYPES.SUCCESS,dynamoRecord);
        
    } catch (err) {
        console.log(err);
        let message = "[PROCESSING_FILES][PROCESSING_FILES_CONTROLLER][CREATE_TRANSFER] - Error";
        response.setResponse(RESPONSE_TYPES.NOT_FOUND, false, message);
    }
    return response;
}

/**
 * @name deleteDynamoHandler
 * @param body Even
 * @description Delete an element in Dynamo
 */
 export async function deleteDynamoHandler(body: any) {
    let response: ResponseModel = new ResponseModel();
    console.log("[LAMBDA_EVENT] - Incomming S3 event", JSON.stringify(body));
    try {
        const dynamoRecord: any = await dbHandler.deleteRecord(TABLE_NAME,body.queryStringParameters["id"]);
        response.setResponse(RESPONSE_TYPES.OK, true, RESPONSE_TYPES.SUCCESS,"The element was delete");
        
    } catch (err) {
        console.log(err);
        let message = "[PROCESSING_FILES][PROCESSING_FILES_CONTROLLER][CREATE_TRANSFER] - Error";
        response.setResponse(RESPONSE_TYPES.NOT_FOUND, false, message);
    }
    return response;
}

/**
 * @name patchDynamoHandler
 * @param body Even
 * @description Update an element in Dynamo
 */
 export async function patchDynamoHandler(event: any) {
    let body = JSON.parse(event.body);
    console.log(body);
    let response: ResponseModel = new ResponseModel();
    console.log("[LAMBDA_EVENT] - Incomming S3 event", JSON.stringify(body));
    try {
        const dynamoRecord: any = await dbHandler.putRecord(TABLE_NAME,body);
        response.setResponse(RESPONSE_TYPES.OK, true, RESPONSE_TYPES.SUCCESS,dynamoRecord);
    } catch (err) {
        console.log(err);
        let message = "[PROCESSING_FILES][PROCESSING_FILES_CONTROLLER][CREATE_TRANSFER] - Error";
        response.setResponse(RESPONSE_TYPES.NOT_FOUND, false, message);
    }
    return response;
}

/**
 * @name getAllInfoDynamoHandler
 * @param body Even
 * @description Consult all the info in Dynamo
 */
 export async function getAllInfoDynamoHandler() {
    let response: ResponseModel = new ResponseModel();
    console.log("[LAMBDA_EVENT] - Incomming S3 event");
    try {
        const dynamoRecord: any = await dbHandler.getAllRecord();
        response.setResponse(RESPONSE_TYPES.OK, true, RESPONSE_TYPES.SUCCESS,dynamoRecord);
        
    } catch (err) {
        console.log(err);
        let message = "[PROCESSING_FILES][PROCESSING_FILES_CONTROLLER][CREATE_TRANSFER] - Error";
        response.setResponse(RESPONSE_TYPES.NOT_FOUND, false, message);
    }
    return response;
}