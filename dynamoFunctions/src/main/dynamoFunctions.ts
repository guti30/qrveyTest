import * as RESPONSE_TYPES from '../../../common/src/main/types/responseTypes';
import *  as dbHandler from '../../../common/src/main/db/commonDb';
import { DB_VARIABLES,LAMBDA_VARIABLES } from '../../../common/src/main/util/dbConfigurations';
import {APIGatewayProxyResult} from "aws-lambda";
import { uuid } from 'uuidv4';



const TABLE_NAME = DB_VARIABLES.tableName;



/**
 * @name postDynamoHandler
 * @param body Even
 * @description Insert a element in Dynamo
 */
export async function postDynamoHandler(event: any): Promise<APIGatewayProxyResult> {
    let response: APIGatewayProxyResult = {
        statusCode: 500,
        body: "",
        headers: LAMBDA_VARIABLES.LAMBDA_RESPONSE_HEADERS
    }
    try {
        let body = JSON.parse(event.body);
        console.log(body);
        let uid = uuid();
        console.log(uid);
        body.id = uid; 
        const dynamoRecord: any = await dbHandler.putRecord(TABLE_NAME,body);
        response.statusCode = RESPONSE_TYPES.OK;
        response.body = "id: "+uid;
        
    } catch (err) {
        console.log(err);
        response.body = JSON.stringify(err);
        response.statusCode = RESPONSE_TYPES.NOT_FOUND;
    }
    return response;
}

/**
 * @name getDynamoHandler
 * @param body Even
 * @description Consult an element in Dynamo
 */
 export async function getDynamoHandler(body: any): Promise<APIGatewayProxyResult> {
    let response: APIGatewayProxyResult = {
        statusCode: 500,
        body: "",
        headers: LAMBDA_VARIABLES.LAMBDA_RESPONSE_HEADERS
    }
    try {
        let id = body.pathParameters.id;
        console.log("[LAMBDA_EVENT]- get ", id);
        const dynamoRecord: any = await dbHandler.getRecord(TABLE_NAME,id);
        response.statusCode = RESPONSE_TYPES.OK;
        response.body =JSON.stringify(dynamoRecord);
        
    } catch (err) {
        console.log(err);
        response.body = JSON.stringify(err);
        response.statusCode = RESPONSE_TYPES.NOT_FOUND;
    }
    return response;
}

/**
 * @name deleteDynamoHandler
 * @param body Even
 * @description Delete an element in Dynamo
 */
 export async function deleteDynamoHandler(body: any): Promise<APIGatewayProxyResult> {
    let response: APIGatewayProxyResult = {
        statusCode: 500,
        body: "",
        headers: LAMBDA_VARIABLES.LAMBDA_RESPONSE_HEADERS
    }
    try {
        console.log("[LAMBDA_EVENT]- delete ", body.pathParameters);
        let id = body.pathParameters.id;
        console.log("[LAMBDA_EVENT]- get ", id);
        const dynamoRecord: any = await dbHandler.deleteRecord(TABLE_NAME,id);
        response.statusCode = RESPONSE_TYPES.OK;
        response.body = "The record was delete";
        
    } catch (err) {
        console.log(err);
        response.body = JSON.stringify(err);
        response.statusCode = RESPONSE_TYPES.NOT_FOUND;
    }
    return response;
}

/**
 * @name patchDynamoHandler
 * @param body Even
 * @description Update a record in Dynamo
 */
 export async function patchDynamoHandler(event: any): Promise<APIGatewayProxyResult> {
    let response: APIGatewayProxyResult = {
        statusCode: 500,
        body: "",
        headers: LAMBDA_VARIABLES.LAMBDA_RESPONSE_HEADERS
    }
    
    try {
        let body = JSON.parse(event.body);
        console.log("[LAMBDA_EVENT]- patch ", body);
        const dynamoRecord: any = await dbHandler.patchRecord(body);
        response.statusCode = RESPONSE_TYPES.OK;
        response.body = "The record was update";
    } catch (err) {
        console.log(err);
        response.body = JSON.stringify(err);
        response.statusCode = RESPONSE_TYPES.NOT_FOUND;
    }
    return response;
}

/**
 * @name getAllInfoDynamoHandler
 * @param body Even
 * @description Consult all the info in Dynamo
 */
 export async function getAllInfoDynamoHandler(): Promise<APIGatewayProxyResult> {
    let response: APIGatewayProxyResult = {
        statusCode: 500,
        body: "",
        headers: LAMBDA_VARIABLES.LAMBDA_RESPONSE_HEADERS
    }
    console.log("[LAMBDA_EVENT] - getAll");
    try {
        const dynamoRecord: any = await dbHandler.getAllRecord();
        response.statusCode = RESPONSE_TYPES.OK;
        response.body =JSON.stringify(dynamoRecord);
        
    } catch (err) {
        console.log(err);
        response.body = JSON.stringify(err);
        response.statusCode = RESPONSE_TYPES.NOT_FOUND;
    }
    return response;
}