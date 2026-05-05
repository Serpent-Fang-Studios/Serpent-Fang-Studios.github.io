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
        playsOn:[{
            type:String,
            enum:["pc","pc.steam","console","console.xbox","console.playstation"]
        }],
        achievements:[]
    }
)

const user_communitySchema = mongoose.Schema(
    {
        role:{
            type:String,
            default:"community.member",
            enum:["community.member", "community.member", "admin.admin", "admin.moderator", "emp.developer", "emp.QnA", "emp.artist", "emp.soundDesigner", "emp.projectManager", "emp.owner", "dev.testUser"],
            required: [true, "must set role"]
        },
        strikes:{
            type:Number,
            min:0,
            default:0,
            required: [true, "must set strikes count"]
        },
        restrictions:[{
            type:String,
            default:[],
            enum:["no-post", "no-bug-report", "no-react", "no-comment", "no-follow", "no-profile", "no-access"]
        }]
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
            select:false,
            required: [true, "must add password"]
        },
        profile:{
            type:user_profileSchema,
            required: [true, "user must have a profile"]
        },
        playedGamesList:{
            type:[user_gamesSchema],
            defult:[]
        },
        connections:[],
        community:{
            type:user_communitySchema,
            required:[true,"user must have a community profile"],
            default:{}
        },
        post:{
            type:[mongoose.SchemaTypes.ObjectId],
            default:[]
        },
        savedpost:{
            type:[mongoose.SchemaTypes.ObjectId],
            default:[]
        },
        bugReports:{
            type:[mongoose.SchemaTypes.ObjectId],
            default:[]
        },
        social:{
            type:user_socialSchema,
            required:[true, "user must have a social profile"],
            default:{}
        },
        cards:{
            type:user_cardsSchema,
            required:[true, "user must have a cards profile"],
            default:{}
        },
        settings:{
            type:user_settingsSchema,
            required:[true, "user must have a settings profile"],
            default:{}
        },
        lastVisited:{
            type:mongoose.SchemaTypes.Date,
            required: [true, "must add creation date"],
            min:Date.now(),
        },
        creationDate:{
            type:mongoose.SchemaTypes.Date,
            default: Date.now
        }
        
    }
);

module.exports = mongoose.model('User', userSchema, 'Users')