//Router
const router = require("../router/routes.js");
const plstSchema = router;
const Playlist = require("../models/playlist.js");

//POST Users
plstSchema.post("/playlist", (req,res) => {
    const playlist = Playlist(req.body);

    playlist
        .save()
        .then(data => res.json(data))
        .catch(err => res.json({ message: err}))

});

//GET Users
plstSchema.get("/playlist", (req,res) => {
    const playlist = Playlist.find(req.body);
    // console.log(req.body);

    playlist
        .then(data => res.json(data))
        .catch(err => res.json({ message: err}))

});

//PATCH Users
plstSchema.patch("/playlist/:_id", (req,res) => {

    const playlist =  Playlist.findByIdAndUpdate(req.params._id, req.body, {new: true})

    playlist 
        .then((playlist) => {
            if (!playlist) {
                return res.status(404).send();
            }
            res.send(playlist);
        }).catch((error) => {
            res.status(500).send(error);
        })
    // console.log(req.body);

});

//DELETE Users
plstSchema.delete("/playlist/:_id", (req,res) => {
    const playlist =  Playlist.findByIdAndDelete(req.params._id)

    playlist 
        .then((playlist) => {
            if (!playlist) {
                return res.status(404).send();
            }
            res.send(playlist);
        }).catch((error) => {
            res.status(500).send(error);
        })
    // console.log(req.body);

});

module.exports = plstSchema;