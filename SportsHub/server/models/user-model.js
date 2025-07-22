const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },

    isAdmin: { 
        type: Boolean,
        default: false
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    profilePhoto: {
        type: String,
        default:"https://res.cloudinary.com/dddwnvp4w/image/upload/v1753179130/default-profile_e7m8je.png",
    },

    institutionType: {
        type: String,
        enum: ['School', 'College', 'University', 'Club'],
    },

    // teams: [
    //     {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Team'
    //     }
    // ],

    // clubs: [
    //     {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Club'
    //     }
    // ],

    points: {
        type: Number,
        default: 0
    },

    matchesPlayed: {
        type: Number,
        default: 0
    },

    achievements: [
        {
        title: String,
        description: String,
        date: {
            type: Date,
            default: Date.now
        }
        }
    ],

    rank: {
        type: String,
        default: 'Rookie'
    },

    activityChart: [
        {
        date: {
            type: Date,
            default: Date.now
        },
        activityType: String,
        details: String
        }
    ]
    }, { timestamps: true });


module.exports=mongoose.model("user",userSchema);