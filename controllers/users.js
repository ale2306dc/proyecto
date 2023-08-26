//Router
const router = require("../router/routes.js");
const usersRouter = router;
const User = require("../models/users.js");

//POST Users
usersRouter.post("/users", (req,res) => {
    const user = User(req.body);

    user
        .save()
        .then(data => res.json(data))
        .catch(err => res.json({ message: err}))

});

//GET Users
usersRouter.get("/users", (req,res) => {
    const user = User.find(req.body);
    // console.log(req.body);

    user
        .then(data => res.json(data))
        .catch(err => res.json({ message: err}))

});

//PATCH Users
usersRouter.patch("/users/:id", (req,res) => {
    const user =  User.findByIdAndUpdate(req.params.id, req.body, {new: true})

    user 
        .then((user) => {
            if (!user) {
                return res.status(404).send();
            }
            res.send(user);
        }).catch((error) => {
            res.status(500).send(error);
        })
    // console.log(req.body);

});

//DELETE Users
usersRouter.delete("/users/:_id", (req,res) => {
    const user =  User.findByIdAndDelete(req.params._id)

    user 
        .then((user) => {
            if (!user) {
                return res.status(404).send();
            }
            res.send(user);
        }).catch((error) => {
            res.status(500).send(error);
        })
    // console.log(req.body);

});

module.exports = usersRouter;