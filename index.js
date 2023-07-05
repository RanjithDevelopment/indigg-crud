const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const deleteTable = require('./connect.js');
const userRouter = require('./Routers/usersRouter.js')
//dotenv configuration
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); 

//table creation
//createTable();
//deleteTable();
app.use('/users',userRouter);




app.listen(process.env.PORT);