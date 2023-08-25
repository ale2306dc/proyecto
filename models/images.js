const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({

    title: {
        type:String,
        required:true
    },
    _id: {
        type:String,
        required:true
    },
    filename:{
        type:String,
        required: true
    },
    userID:{  
        type:String,
        required: true
    },
    plstID: {
        type:String,
        default: null
    },
    albumID: {
        type: String,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false
}
)

//MODELS

const Image = mongoose.model("images", imgSchema);

module.exports = Image;