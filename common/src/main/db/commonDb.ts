import * as AWS from 'aws-sdk';
import { DB_VARIABLES } from '../../../../common/src/main/util/dbConfigurations';

export async function putRecord (tableName:string, item:any): Promise<any> {
    const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10', convertEmptyValues: true });
    const params = {
        TableName: tableName,
        Item: item,
        ReturnValues: "ALL_OLD"
    };
    let data:any;
    try {
        data =  await docClient.put(params).promise();
        console.log(data);
        return data;
        
    } catch (err) {
        console.error("Error", err);
        return err;
    }
}

export async function  getRecord<T>(tableName:string, id:string|undefined): Promise<T> {
    console.log(id);
    const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10', convertEmptyValues: true });
    const params = {
        TableName:tableName,
        Key:{"id":id}
    }
    const data = await docClient.get(params).promise();
    console.log(data);
    return data.Item as T;
}

export async function deleteRecord(tableName:string, id:any){
    const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10', convertEmptyValues: true });
    const params = {
        TableName:tableName,
        Key:{"id":id}
    };
    
    let data:any;
    try {
        data =  await docClient.delete(params).promise();
        console.log(data);
        return data;
    } catch (err) {
        console.error("Error", err);
        return err;
    }
}

export async function getAllRecord(){
    var documentClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        TableName : DB_VARIABLES.tableName
    }
    let data = await documentClient.scan(params).promise();
    console.log(data);
    return data.Items;
}

export async function patchRecord(updateRecord:any){
    let expresionsNames: any = {};
    let expresionsValues: any = {};
    let exp = {
        UpdateExpression: 'set',
        ExpressionAttributeNames: expresionsNames,
        ExpressionAttributeValues: expresionsValues
    }
    Object.entries(updateRecord).forEach(([key, item]) => {
        if(key != "id"){
        exp.UpdateExpression += ` #${key} = :${key},`;
        exp.ExpressionAttributeNames["#"+key] = key;
        exp.ExpressionAttributeValues[`:${key}`] = item
        }
    })
    exp.UpdateExpression = exp.UpdateExpression.slice(0, -1);

   
    var documentClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        TableName: DB_VARIABLES.tableName,
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
            ':id': updateRecord.id
        }
        
    }
    let data = await documentClient.query(params).promise();
    if (data && data.Items) {
        for (const result of data.Items) {
            let updateParams = {
                TableName: DB_VARIABLES.tableName,
                Key: { id: result.id },
                ...exp
            }
            await documentClient.update(updateParams).promise();
        }
    }


}
