//node js req
const http = require('http');
const path = require('path');
const fs = require('fs');


//npm req
const express = require('express');
require('dotenv').config();

//other req

const {connectDB} = require('./config/db');
const {connectEmail, sendMessage} = require('./config/email')
const {errorHandler} = require('./middleware/errorHandelingMiddleware')

//pre reqs
connectDB();
connectEmail();

if(process.env.CONNECTION_EMAIL==="true"){
    sendMessage(process.env.SFS_EMAIL_USER, "Connection", "The SFS website server is now connected to this email, automatic messages will be sent out from this email", null);
}
//server

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded(
    {
        extended: false
    }
));

app.use(errorHandler);

//routes
app.use('/',express.static(path.join(__dirname,"../frontend/public")))
app.use('/api/users', require('./routes/api/userRoutes'));
app.use('/api/cards', require('./routes/api/cardRoutes'));
app.use('/api/games', require('./routes/api/gameRoutes'));
app.use('/api/auth', require('./routes/api/authRoutes'));
app.use('/api/reports', require('./routes/api/reportRoutes'));
app.use('/api/post', require('./routes/api/postRoutes'));

app.listen(process.env.PORT, ()=>{console.log(`Server started on port: ${process.env.PORT}; \n\tmove this to a report function from config`)})

