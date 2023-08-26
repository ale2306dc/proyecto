//Router
const router = require("../router/routes.js");
const songsRouter = router;
const Song = require("../models/songs.js");

//POST Users
songsRouter.post("/songs", (req,res) => {
    const song = Song(req.body);

    song
        .save()
        .then(data => res.json(data))
        .catch(err => res.json({ message: err}))

});

//GET Users
songsRouter.get("/songs", (req,res) => {
    const song = Song.find(req.body);
    // console.log(req.body);

    song
        .then(data => res.json(data))
        .catch(err => res.json({ message: err}))

});

//PATCH Users
songsRouter.patch("/songs/:_id", (req,res) => {
    const song =  Song.findByIdAndUpdate(req.params._id, req.body, {new: true})

    song 
        .then((song) => {
            if (!song) {
                return res.status(404).send();
            }
            res.send(song);
        }).catch((error) => {
            res.status(500).send(error);
        })
    // console.log(req.body);

});

//DELETE Users
songsRouter.delete("/songs/:_id", (req,res) => {
    const song =  Song.findByIdAndDelete(req.params._id)

    song 
        .then((song) => {
            if (!song) {
                return res.status(404).send();
            }
            res.send(song);
        }).catch((error) => {
            res.status(500).send(error);
        })
    // console.log(req.body);

});

module.exports = songsRouter;