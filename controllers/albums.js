//Router
const router = require("../router/routes.js");
const albumsRouter = router;
const Album = require("../models/albums.js");

//POST Users
albumsRouter.post("/albums", (req,res) => {
    const album = Album(req.body);

    album
        .save()
        .then(data => res.json(data))
        .catch(err => res.json({ message: err}))

});

//GET Users
albumsRouter.get("/albums", (req,res) => {
    const album = Album.find(req.body);
    // console.log(req.body);

    album
        .then(data => res.json(data))
        .catch(err => res.json({ message: err}))

});

//PATCH Users
albumsRouter.patch("/albums/:id", (req,res) => {
    const album =  Album.findByIdAndUpdate(req.params.id, req.body, {new: true})

    album 
        .then((album) => {
            if (!album) {
                return res.status(404).send();
            }
            res.send(album);
        }).catch((error) => {
            res.status(500).send(error);
        })
    // console.log(req.body);

});

//DELETE Users
albumsRouter.delete("/albums/", (req,res) => {
    const album =  Album.findOneAndDelete(req.body)

    album 
        .then((album) => {
            if (!album) {
                return res.status(404).send();
            }
            res.send(album);
        }).catch((error) => {
            res.status(500).send(error);
        })
    // console.log(req.body);

});

module.exports = albumsRouter;