const mongoose = require("mongoose");

const pendingUserSchema = mongoose.Schema(
    {
        username:{
            type:String,
            required: [true, "must add username"]
        },
        email:{
            type:String,
            required:[true,"must add email"],
        },
        password:{
            type:String,
            required:[true,"must add password"]
        },
        displayName:{
            type:String,
            required: [true, "user must have a display name"]
        },
        bio:String,
        token:{
            type:String,
            required:[true,"must add token"]
        }
    }
)


module.exports = mongoose.model('PendingUser', pendingUserSchema, 'pendingusers');