const mongoose = require('mongoose');


const user_profileSchema = mongoose.Schema(
    {
        displayName:{
            type:String,
            required: [true, "user must have a display name"]
        },
        bio:String,
        avatar:String
    }
);

const user_gamesSchema = mongoose.Schema(
    {
        gameID:{
            type:mongoose.SchemaTypes.ObjectId,
            required: [true, "gameid is required"]
        },
        playTime:{
            type:Number,
            min:0
        },
        playsOn:{
            type:mongoose.SchemaTypes.Array,
            enum:["pc","pc.steam","console","console.xbox","console.playstation"]
        },
        achievements:[]
    }
)

const user_connectionSchema = mongoose.Schema(
    {
        steam:String,
        discord:String
    }
)

const user_communitySchema = mongoose.Schema(
    {
        role:{
            type:String,
            enum:["community.member", "community.member", "admin.admin", "admin.moderator", "emp.developer", "emp.QnA", "emp.artist", "emp.soundDesigner", "emp.projectManager", "emp.owner", "dev.testUser"],
            required: [true, "must set role"]
        },
        strikes:{
            type:Number,
            min:0,
            required: [true, "must set strikes count"]
        },
        restrictions:{
            type:mongoose.SchemaTypes.Array,
            enum:["no-post", "no-bug-report", "no-react", "no-comment", "no-follow", "no-profile", "no-access"]
        }
    }
)

const user_socialSchema = mongoose.Schema(
    {
        followers:[mongoose.SchemaTypes.ObjectId],
        followed_users:[mongoose.SchemaTypes.ObjectId],
        blocked_users:[mongoose.SchemaTypes.ObjectId]
    }
)
const user_cardsSchema = mongoose.Schema(
    {
        locked_cards:[mongoose.SchemaTypes.ObjectId],
        hidden_cards:[mongoose.SchemaTypes.ObjectId],
        unlocked_cards:[mongoose.SchemaTypes.ObjectId]
    }
)
const user_settingsSchema = mongoose.Schema(
    {
        theme:String,
        notifications:mongoose.SchemaTypes.Boolean
    }
)

const userSchema = mongoose.Schema(
    {
        username:{
            type:String,
            required: [true, "must add username"]
        },
        email:{
            type:String,
            required: [true, "must add email"]
            //add email vaildation validate:function()
        },
        passwordHash:{
            type:String,
            required: [true, "must add password"]
        },
        profile:{
            type:user_profileSchema,
            required: [true, "user must have a profile"]
        },
        playedGamesList:[user_gamesSchema],
        connections:user_connectionSchema,
        community:{
            type:user_communitySchema,
            required:true
        },
        post:[mongoose.SchemaTypes.ObjectId],
        savedpost:[mongoose.SchemaTypes.ObjectId],
        bugReports:[mongoose.SchemaTypes.ObjectId],
        social:{
            type:user_socialSchema,
            required:[true, "user must have a social profile"]
        },
        cards:{
            type:user_cardsSchema,
            required:[true, "user must have a cards profile"]
        },
        settings:{
            type:user_settingsSchema,
            required:[true, "user must have a settings profile"]
        },
        lastVisited:{
            type:mongoose.SchemaTypes.Date,
            required: [true, "must add creation date"],
            min:Date.now()
        },
        creationDate:{
            type:mongoose.SchemaTypes.Date,
            default: Date.now
        }
        
    }
);