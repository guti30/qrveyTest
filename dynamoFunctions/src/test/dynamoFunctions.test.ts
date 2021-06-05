import * as dynamoFunctions from '../main/dynamoFunctions';
import * as commonDb from '../../../common/src/main/db/commonDb';

describe("processingDynamoRecords", () => {
    it(`Success post record`, async () => {
        let request = {"name":"ironman"};
        const event ={body:JSON.stringify(request)};
        const DYNAMO_OBJECT = {
            statusCode: 200,
            body: {
            status: "success",
            message: "OK",
            description: "Message sent successfully",
            }
            };
        let dynamObject:any = DYNAMO_OBJECT;
        let seObjectMock = jest.spyOn(commonDb,"putRecord").mockReturnValueOnce(dynamObject);
        let dynamoEventMock:any = event;
        let response: any = await dynamoFunctions.postDynamoHandler(dynamoEventMock);
        expect(response.statusCode).toEqual(200);
        seObjectMock.mockRestore();

    });
    it(`Fail post record`, async () => {
        let request = {"name":"ironman"};
        const event ={body:request};
        let dynamoEventMock:any = event;
        let response: any = await dynamoFunctions.postDynamoHandler(dynamoEventMock);
        expect(response.statusCode).toEqual(404);
    });

    it(`Success get record`, async () => {
        const event ={pathParameters:{id:"1234"}};
        const DYNAMO_OBJECT = {
            statusCode: 200,
            body: {
            status: "success",
            message: "OK",
            description: "Message sent successfully",
            }
            };
        let dynamObject:any = DYNAMO_OBJECT;
        let seObjectMock = jest.spyOn(commonDb,"getRecord").mockReturnValueOnce(dynamObject);
        let dynamoEventMock:any = event;
        let response: any = await dynamoFunctions.getDynamoHandler(dynamoEventMock);
        expect(response.statusCode).toEqual(200);
        seObjectMock.mockRestore();

    });
    it(`Fail get record`, async () => {
        let request = {"name":"ironman"};
        const event ={body:request};
        let dynamoEventMock:any = event;
        let response: any = await dynamoFunctions.getDynamoHandler(dynamoEventMock);
        expect(response.statusCode).toEqual(404);
    });

    it(`Success delete record`, async () => {
        const event ={pathParameters:{id:"1234"}};
        const DYNAMO_OBJECT = {
            statusCode: 200,
            body: {
            status: "success",
            message: "OK",
            description: "Message sent successfully",
            }
            };
        let dynamObject:any = DYNAMO_OBJECT;
        let seObjectMock = jest.spyOn(commonDb,"deleteRecord").mockReturnValueOnce(dynamObject);
        let dynamoEventMock:any = event;
        let response: any = await dynamoFunctions.deleteDynamoHandler(dynamoEventMock);
        expect(response.statusCode).toEqual(200);
        seObjectMock.mockRestore();

    });
    it(`Fail delete record`, async () => {
        let request = {"name":"ironman"};
        const event ={body:request};
        let dynamoEventMock:any = event;
        let response: any = await dynamoFunctions.deleteDynamoHandler(dynamoEventMock);
        expect(response.statusCode).toEqual(404);
    });

    it(`Success patch record`, async () => {
        let request = {"name":"ironman"};
        const event ={body:JSON.stringify(request)};
        const DYNAMO_OBJECT = {
            statusCode: 200,
            body: {
            status: "success",
            message: "OK",
            description: "Message sent successfully",
            }
            };
        let dynamObject:any = DYNAMO_OBJECT;
        let seObjectMock = jest.spyOn(commonDb,"patchRecord").mockReturnValueOnce(dynamObject);
        let dynamoEventMock:any = event;
        let response: any = await dynamoFunctions.patchDynamoHandler(dynamoEventMock);
        expect(response.statusCode).toEqual(200);
        seObjectMock.mockRestore();

    });
    it(`Fail patch record`, async () => {
        let request = {"name":"ironman"};
        const event ={body:request};
        let dynamoEventMock:any = event;
        let response: any = await dynamoFunctions.patchDynamoHandler(dynamoEventMock);
        expect(response.statusCode).toEqual(404);
    });

    it(`Success getAll record`, async () => {
        const DYNAMO_OBJECT = {
            statusCode: 200,
            body: {
            status: "success",
            message: "OK",
            description: "Message sent successfully",
            }
            };
        let dynamObject:any = DYNAMO_OBJECT;
        let seObjectMock = jest.spyOn(commonDb,"getAllRecord").mockReturnValueOnce(dynamObject);
        let response: any = await dynamoFunctions.getAllInfoDynamoHandler();
        expect(response.statusCode).toEqual(200);
        seObjectMock.mockRestore();

    });

})