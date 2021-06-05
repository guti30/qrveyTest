import { INTERNAL_SERVER_ERROR, ERROR_MESSAGE } from '../types/responseTypes';

export class ResponseModel{
    statusCode: number;
    response: boolean;
    message: string;
    result: any;
    headers: { [header: string]: string | number | boolean; };

    constructor() {
        this.statusCode = INTERNAL_SERVER_ERROR;
        this.response = false;
        this.message = ERROR_MESSAGE;
        this.result = {};
        this.headers = {
            "Access-Control-Allow-Headers" : "Content-Type,Authorization,x-apigateway-header,x-amz-date",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT"
        };
    }

    setResponse(status: number, res: boolean, msg: string, result?: any) : void {
        this.statusCode = status;
        this.response = res;
        this.message = msg;
        this.result = result;
    }
}
