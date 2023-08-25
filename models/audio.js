const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema({

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
    }
}, {
    timestamps: true,
    versionKey: false
}
)

//MODELS

const Audio = mongoose.model("audio", audioSchema);

module.exports = Audio;