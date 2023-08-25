const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    _id: {
        type:String,
        required:true
    },
    user: {
        type: String,
        required: true
    },
    pass:  {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }

}, {
    timestamps: true,
    versionKey: false
}
)

//MODELS


const User = mongoose.model("user", userSchema);


module.exports = User;