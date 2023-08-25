const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({

    _id: {
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    userID:{
        type:String,
        required:true
    },
    imgSrc: {
        type:String,
        required:true
    },
    audioSrc: {
        type:String,
        required:true
    },
    user: {
        type:String,
        required:true
    }
}, {
    timestamps: true,
    versionKey: false
}
)

//MODELS

const Song = mongoose.model("songs", songSchema);

module.exports = Song;