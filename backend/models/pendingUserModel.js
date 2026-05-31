const mongoose = require("mongoose");

const pendingUserSchema = mongoose.Schema(
    {
        email:{
            type:String,
            required:[true,"must add email"],
        },
        password:{
            type:String,
            required:[true,"must add password"]
        },
        token:{
            type:String,
            required:[true,"must add token"]
        }
    }
)


module.exports = mongoose.model('PendingUser', pendingUserSchema, 'pendingusers');