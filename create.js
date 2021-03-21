import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const license = data.license;
  const location = data.location;
  const totalTime = data.totalTime;
  const createdAt = Date.now();
  const item = {
    license, location, totalTime, createdAt
  };
  const params = {
    TableName: process.env.tableName,
    Item: item,
  };
  await dynamoDb.put(params);
  return params.Item;
});

// import AWS from "aws-sdk";

// const dynamoDb = new AWS.DynamoDB.DocumentClient();

// export async function main(event, context) {
//     // Request body is passed in as a JSON encoded string in 'event.body'
//     const data = JSON.parse(event.body);
//     const params = {
//       TableName: process.env.tableName,
//       Item: {
//         license: "G52352", // The id of the author
//         content: data, // Parsed from request body
//         createdAt: Date.now(), // Current Unix timestamp
//       },
//     };
//     try {
//       console.log(params);
//       await dynamoDb.put(params).promise();
//       return {
//         statusCode: 200,
//         body: JSON.stringify(params.Item),
//       };
//     } catch (e) {
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ error: e.message }),
//       };
//     }
//   }