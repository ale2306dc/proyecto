const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({

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
        required: true
    },
    genre: {
        type:String,
        default:null
    },
    imageID: {
        type:String,
        default: null
    },
    description: {
        type:String,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false
}
)

//MODELS

const Album = mongoose.model("albums", albumSchema);

module.exports = Album;