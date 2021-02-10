// dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// router components
const userRouter = require('./routers/userRouter')

dotenv.config();

// set up server
const app = express();
const PORT = process.env.PORT || 7000;
app.listen(PORT, ()=>console.log(`Server run on port: ${PORT}`));

app.use(express.json());

// connect to mongodb
mongoose.connect(process.env.MDB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} ,(err)=> {
    if(err) return console.error(err);
    console.log(`Connected to mongoDB.`);
});

// setup routes
app.use('/v1/auth/', userRouter)