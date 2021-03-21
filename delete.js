import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const license = data.license;
  const params = {
    TableName: process.env.tableName,
    Key: {
      license: license,
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});