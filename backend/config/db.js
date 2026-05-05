//connect to the database

const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI_SRV);
        console.log("Mongo DB connection succesfull");
        return;
    } catch (error) {
        console.log("ERROR with SRV connection");
        console.log(error);
    }

    console.log("Attempting non SRV connection")
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongo DB connection succesfull");
        return;
    } catch (error) {
        console.log("ERROR with non SRV connection");
        console.log(error);
        console.log("Terminating Server");
        process.exit(-1);
    }
}

module.exports={connectDB}