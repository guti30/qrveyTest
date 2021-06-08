import {APIGatewayProxyResult} from "aws-lambda";
import * as RESPONSE_TYPES from '../../../common/src/main/types/responseTypes';
import { LAMBDA_VARIABLES } from '../../../common/src/main/util/dbConfigurations';
import *  as dbHandler from '../../../common/src/main/db/commonDb';
import json2csv from 'json-2-csv';
import * as s3Upload from '../main/s3Config/s3UploadHandler'
import { jsPDF } from "jspdf";



let headerArray:any = [];
let dataArray:any = [];
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
            var doc = new jsPDF({ orientation: "landscape" });
            let listObj:any = [];
            for(var val of dynamoRecord){
            headerArray = [];
            keysAndElementsFromJson(val);
            var obJson =listToJson(headerArray,dataArray);
            listObj.push(obJson);
            dataArray = []; 
            }
            let headerFormat:any = createHeaders(headerArray);
            console.log(headerFormat);
            console.log(listObj);
            let dataPdf = await doc.table(1,1,listObj,headerFormat,{ autoSize: true });
            console.log("47");
            console.log(dataPdf.output());
            pdfUrl = await s3Upload.s3UploadHandler(dataPdf.output(),"pdf");
            response.body = "url csv: " + csvUrl + "\nurl pdf: " + pdfUrl;


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

 function keysAndElementsFromJson(array:any){
    
    if( typeof array != 'object'){
        console.log("values")    
        console.log(array)
        dataArray.push(array);  
    }
    else{
      for( let element in array){
        if( typeof array[element] != 'object'){  
            headerArray.push(element);           
        }
        console.log("key")  
        console.log(element) 
        keysAndElementsFromJson(array[element]);   
        
        }
    }

}

function listToJson(labels:[],data:[]){
    let obj:any = {};
    for (var i = 0; i < labels.length; i++) {
     obj[labels[i]] = data[i];
  }
    return obj
  }

  function createHeaders(keys:any) {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
      result.push({
        id: keys[i],
        name: keys[i],
        prompt: keys[i],
        width: 65,
        align: "center",
        padding: 0
      });
    }
    return result;
  }