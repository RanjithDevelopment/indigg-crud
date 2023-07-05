const AWS = require('aws-sdk');

// Set the configuration for the local DynamoDB endpoint
AWS.config.update({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
});

// Create a DynamoDB service object
const dynamodb = new AWS.DynamoDB();
const DocumentClient = new AWS.DynamoDB.DocumentClient();
// //Define the table parameters
// module.exports = function createTable() {
//     var params = {
//         TableName : "Users",
//         KeySchema: [       
//             { AttributeName: "id", KeyType: "HASH"}
//             ],
//         AttributeDefinitions: [       
//             { AttributeName: "id", AttributeType: "S" },
//             { AttributeName: "name", AttributeType: "S" },
//             { AttributeName: "email", AttributeType: "S" }    
//         ],
//     ProvisionedThroughput: {       
//         ReadCapacityUnits: 5, 
//         WriteCapacityUnits: 5
//         },
//     GlobalSecondaryIndexes: [{
//         IndexName: "UserIndex",
//         KeySchema: [
//             {
//                 AttributeName: "name",
//                 KeyType: "HASH"
//                 },
//             {
//                 AttributeName: "email",
//                 KeyType: "RANGE"
//             }
//         ],
//         Projection: {
//             ProjectionType: "ALL"
//             },
//         ProvisionedThroughput: {
//             ReadCapacityUnits: 1,
//             WriteCapacityUnits: 1
//             }
//         }]
//     };
//       dynamodb.createTable(params, (err, data) => {
//         if (err) {
//           console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
//         } else {
//           console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
//         }
//       });
      
// }
// module.exports=function deleteTable() {
//     const params = {
//       TableName: 'User'
//     };
  
//     dynamodb.deleteTable(params, function(err, data) {
//       if (err) {
//         console.error('Error deleting table:', err);
        
//       } else {
//         console.log('Table deleted successfully');
        
//       }
//     });
//   }

