import * as AWS from 'aws-sdk';
import  * as RESPONSE_TYPES  from '../../../../common/src/main/types/responseTypes';

/**
 * @name S3Controller
 * @description S3Controller class
 */
class S3Controller {
    private S3: AWS.S3;
    /**
     * @name constructor
     * @description Method constructor
     */
    constructor() {
        this.S3 = new AWS.S3();
    }
    /**
     * @name getObject
     * @description Method to get objects from s3
     * @param {string} bucket - bucket
     * @param {string} key - key
     * @returns {Promise}
     */
    public async getObject(bucket: string, key: string): Promise<any> {
        let response: any, parameters: any, data: any, statusCode: number, status: string;
        try {
            parameters = { Bucket: bucket, Key: key };
            data = await this.S3.getObject(parameters).promise();
            statusCode = RESPONSE_TYPES.OK;
            status = RESPONSE_TYPES.SUCCESS;
            response = {"code":statusCode, "status": status, "body":data.Body};
            return (response);
        } catch (error) {
            let errorMessage: string = "[S3_CONTROLLER][GET_OBJECT] - Error";
            let errorResponse: any;
            errorResponse = {"code":RESPONSE_TYPES.NOT_FOUND, "status": errorMessage};
            console.log(errorMessage, error);
            return (errorResponse);
        }
    }

}
const s3Controller = new S3Controller;
export default s3Controller;