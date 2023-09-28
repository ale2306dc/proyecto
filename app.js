require('dotenv').config();
const express = require('express');
const app = express(); //Crear una nueva aplicación de express en la variable app
const mongoose = require('mongoose');
const path = require('path');


const usersRouter = require('./controllers/users.js');
const audioRouter = require('./controllers/audio.js');
const imgRouter = require('./controllers/images.js');
const songsRouter = require('./controllers/songs.js');




(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI_TEST);
        console.log('Te has conectado a MongoDB');
    } catch (error) {
        console.log(error);
    }
})()

// //rutas frontend

app.use("/", express.static(path.resolve("views", "main")));
app.use("/home", express.static(path.resolve("views", "home")));
app.use("/images", express.static(path.resolve("uploads", "img")));
app.use("/audios", express.static(path.resolve("uploads", "audio")));
app.use("/upload", express.static(path.resolve("views", "upload")));
app.use("/enter", express.static(path.resolve("views", "entrar")));
app.use("/album", express.static(path.resolve("views", "album")));
app.use("/reproductor", express.static(path.resolve("views", "reproductor")));
app.use("/buscador", express.static(path.resolve("views", "buscador")));
app.use("/user", express.static(path.resolve("views", "user")));
app.use("/admin", express.static(path.resolve("views", "userAdmin")));
app.use("/delete", express.static(path.resolve("views", "delete")));
app.use("/deleteUser", express.static(path.resolve("views", "deleteUser")));

// //IMPORTANTE
app.use(express.json());

// //Rutas Backend
app.use('/api', usersRouter)
app.use('/api', imgRouter)
app.use('/api', songsRouter);
app.use('/api', audioRouter)


module.exports = app;