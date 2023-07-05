const express = require('express');
const AWS = require('aws-sdk');
const DocumentClient = new AWS.DynamoDB.DocumentClient();

// Set the configuration for the local DynamoDB endpoint
AWS.config.update({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
});

// Create a DynamoDB service object
const dynamodb = new AWS.DynamoDB();
const router = express.Router();
const TABLE_NAME = 'Users'
router.get('/', async(req, res, next) => {

    const params = {
        TableName: TABLE_NAME // Replace with the name of your DynamoDB table
    };

    dynamodb.scan(params, (err, data) => {
        if (err) {
            console.error('Error retrieving data:', err);
        } else {
            const items = data.Items.map(item => AWS.DynamoDB.Converter.unmarshall(item));
            console.log('Retrieved items:', items);
            res.status(200).send(items);
        }
    });

});
router.post('/post', async(req, res, next) => {
    const { id, name, email } = req.body;
    const params = {
        TableName: TABLE_NAME,
        Item: {
            id: { S: id },
            name: { S: name },
            email: { S: email }
        }
    };
    if (params.Item) {
        dynamodb.putItem(params, (err, data) => {
            if (err) {
                console.error('Error inserting item:', err);
                res.status(400).send({ msg: 'Error inserting item:' });
            } else {
                console.log('Item inserted successfully!');
                res.status(200).send(data)
            }
        });

    }




});

router.put('/update/:id', async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    

     
    ////////////////////
    const generateUpdateQuery = (fields) => {
        let exp = {
            UpdateExpression: 'set',
            ExpressionAttributeNames: {},
            ExpressionAttributeValues: {},
        };
        Object.entries(fields).forEach(([key, item]) => {
            exp.UpdateExpression += ` #${key} = :${key},`;
            exp.ExpressionAttributeNames[`#${key}`] = key;
            exp.ExpressionAttributeValues[`:${key}`] = item;
        });
        exp.UpdateExpression = exp.UpdateExpression.slice(0, -1);
        return exp;
    };
///////////
    const updateItem = async (TABLE_NAME, id, itemObject) => {
        const expression = generateUpdateQuery(itemObject);
        
        const params = {
            TableName: TABLE_NAME,
            Key: {
                id,
            },
            ConditionExpression: 'attribute_exists(id)',
            ...expression,
            ReturnValues: 'UPDATED_NEW',
        };
        return await DocumentClient.update(params).promise();
    };
/////////////
    try {
        
       const item = await updateItem(TABLE_NAME, id, body);
        res.status(200).json(item);
    } catch (err) {
        console.error("error in updation",err);
        res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong' });
    }
});
router.delete('/delete/:id', async (req,res) => {
    const id = req.params.id;
    const params = {
		TableName: TABLE_NAME,
		Key: {
			id,
		},
	};
	try {
      const result  = await DocumentClient.delete(params).promise();
        console.log('Item deleted successfully');
        res.status(200).json(result);
      } catch (error) {
        console.error('Error deleting item:', error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Something went wrong' });
        throw error;
      }

});

module.exports = router;