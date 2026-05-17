const mongoose = require("mongoose");

const mediaSchema = mongoose.Schema(
    {
        path:{
            type:String,
            required:[true, "must include media path"]
        },
        type:{
            type:String,
            required:[true, "must include media type"]
        },
        altText:{
            type:String,
            default:"media file not found"
        },
        creationDate:{
                    type:mongoose.SchemaTypes.Date,
                    default: Date.now
        }
    }
);

module.exports = mongoose.model('Media',mediaSchema,'media')