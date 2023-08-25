//Router
const router = require("../router/routes.js");
const audioSchema = router;
const Audio = require("../models/audio.js");
const multerUpload = require("../multer/audio.js");
const fs = require("fs");

//POST Users
audioSchema.post("/audio", multerUpload.single("file"), (req,res) => {

    console.log(req.body);
    
    const audio = Audio(
        {
            title: req.body.title,
            _id: req.body._id,
            filename:uplName,
            userID:req.body.userID,
        }
    )
    
    audio
    .save()
    .then(data => console.log(data))
    .catch(err => console.log(err));

    res.sendStatus(200)

});

//GET Users
audioSchema.get("/audio/:_id", (req,res) => {
    const audio = Audio.findById(req.params._id);
    // console.log(req.body);

    audio
        .then(data => res.json(data))
        .catch(err => res.json({ message: err}))

});

//PATCH Users
audioSchema.patch("/audio/:_id", (req,res) => {

    const audio =  Audio.findByIdAndUpdate(req.params.id, req.body, {new: true})

    audio 
        .then((audio) => {
            if (!audio) {
                return res.status(404).send();
            }
            res.send(audio);
            console.log(audio);
        }).catch((error) => {
            res.status(500).send(error);
        })
    // console.log(req.body);

});

//DELETE Users
audioSchema.delete("/audio/:title",(req,res) => {
    const audio =  Audio.findOneAndDelete(req.params.title)


    audio 
        .then((audio) => {
            if (!audio) {
                return res.status(404).send();
            }
            res.send(audio);

            fs.unlink(`../Proyecto/uploads/audio/${audio.filename}`, (err) => {
                if (err) throw err;
                console.log("File deleted!");
             });
        }).catch((error) => {
            res.status(500).send(error);
        })
    // console.log(req.body);

});

module.exports = audioSchema;