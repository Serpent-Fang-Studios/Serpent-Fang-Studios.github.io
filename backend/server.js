//node js req
const http = require('http');
const path = require('path');
const fs = require('fs');


//npm req
const express = require('express');
require('dotenv').config();

//other req

const {connectDB} = require('./config/db');

//pre reqs
connectDB();

//server

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded(
    {
        extended: false
    }
));

//routes
app.use('/',express.static(path.join(__dirname,"../frontend/public")))
app.use('/api/users', require('./routes/api/userRoutes'));
app.use('/api/cards', require('./routes/api/cardRoutes'));
app.use('/api/games', require('./routes/api/gameRoutes'));
app.use('/api/auth', require('./routes/api/authRoutes'));
app.use('/api/reports', require('./routes/api/reportRoutes'));
app.use('/api/post', require('./routes/api/postRoutes'));

app.listen(process.env.PORT, ()=>{console.log(`Server started on port: ${process.env.PORT}; \n\tmove this to a report function from config`)})

