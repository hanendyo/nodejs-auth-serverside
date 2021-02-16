// dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const cors = require('cors')

dotenv.config();

// set up server
const app = express();
const PORT = process.env.PORT || 7000;
app.listen(PORT, ()=>console.log(`Server run on port: ${PORT}`));

app.use(express.json());
app.use(cookieParser())

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true, //--> access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions))

// connect to mongodb
mongoose.connect(process.env.MDB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} ,(err)=> {
    if(err) return console.error(err);
    console.log(`Connected to mongoDB.`);
});

// router components
const userRouter = require('./routers/userRouter')
const customerRouter = require('./routers/customerRouter');

// setup routes
app.use('/v1/auth', userRouter)
app.use('/v1/customer', customerRouter)