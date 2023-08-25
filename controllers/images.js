//Router
const router = require("../router/routes.js");
const imgSchema = router;
const Image = require("../models/images.js");
const multerUpload = require("../multer/img.js");
const fs = require("fs");

//POST Users
imgSchema.post("/images", multerUpload.single("file"), (req,res) => {

    console.log(req.body);
    
    const images = Image(
        {
            title: req.body.title,
            _id: req.body._id,
            filename:uplName,
            userID:req.body.userID,
        }
    )
    
    images
    .save()
    .then(data => console.log(data))
    .catch(err => console.log(err));

    res.sendStatus(200)
});

//GET Users
imgSchema.get("/images/:_id", (req,res) => {
    const images = Image.findById(req.params._id);
    // console.log(req.body);

    images
        .then(data => res.json(data))
        .catch(err => res.json({ message: err}))

});

//PATCH Users
imgSchema.patch("/images/:_id", (req,res) => {

    const images =  Image.findByIdAndUpdate(req.params.id, req.body, {new: true});

    images 
        .then((images) => {
            if (!images) {
                return res.status(404).send();
            }
            res.send(images);
            console.log(images);
        }).catch((error) => {
            res.status(500).send(error);
        })
    // console.log(req.body);

});

//DELETE Users
imgSchema.delete("/images/:title",(req,res) => {
    const images =  Image.findOneAndDelete(req.params.title)


    images 
        .then((images) => {
            if (!images) {
                return res.status(404).send();
            }
            res.send(images);

            fs.unlink(`../Proyecto/uploads/img/${images.filename}`, (err) => {
                if (err) throw err;
                console.log("File deleted!");
             });
        }).catch((error) => {
            res.status(500).send(error);
        })
    // console.log(req.body);

});

module.exports = imgSchema;