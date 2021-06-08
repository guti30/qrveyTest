import {downloadPdfExcelStoreListHandler} from '../main/downloadPdfExcelStoreList'
import * as commonDb from '../../../common/src/main/db/commonDb';
import * as s3Upload from '../main/s3Config/s3UploadHandler'

describe("processingDynamoRecords", () => {
    it(`Success downloadPdfExcelStoreList`, async () => {
        const DYNAMO_OBJECT = [
            {
                "alias": "BotTest",
                "species": "Bot",
                "id": "e3bdfd95-f847-4a62-a204-9fa87788ffa0",
                "name": "Tony Stark"
            }
        ];

        let dynamObject:any = DYNAMO_OBJECT;
        let seObjectMock = jest.spyOn(commonDb,"getAllRecord").mockReturnValueOnce(dynamObject);
        let s3ObjectMock = jest.spyOn(s3Upload, "s3UploadHandler").mockResolvedValue("url");
        let response: any = await downloadPdfExcelStoreListHandler();
        expect(response.statusCode).toEqual(200);
        seObjectMock.mockRestore();
        s3ObjectMock.mockRestore();

    });
    it(`Success downloadPdfExcelStoreList when the list is empty`, async () => {
        let dynamObject:any = [];
        let seObjectMock = jest.spyOn(commonDb,"getAllRecord").mockReturnValueOnce(dynamObject);
        let response: any = await downloadPdfExcelStoreListHandler();
        expect(response.statusCode).toEqual(200);
        seObjectMock.mockRestore();

    });
    it(`Fail downloadPdfExcelStoreList`, async () => {
        const DYNAMO_OBJECT = null;
        let dynamObject:any = DYNAMO_OBJECT;
        let seObjectMock = jest.spyOn(commonDb,"getAllRecord").mockReturnValueOnce(dynamObject);
        let response: any = await downloadPdfExcelStoreListHandler();
        expect(response.statusCode).toEqual(404);
        seObjectMock.mockRestore();
    })
})