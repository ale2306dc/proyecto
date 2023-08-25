const mongoose = require("mongoose");

const plstSchema = new mongoose.Schema({

    _id: {
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true},
    songsID:Array
}, {
    timestamps: true,
    versionKey: false
}
)

//MODELS

const Playlist = mongoose.model("playlist", plstSchema);

module.exports = Playlist;