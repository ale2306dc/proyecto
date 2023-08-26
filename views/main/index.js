function obtenerDatos() {
    
    const url = "http://localhost:3000/api/songs";

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarDatos(resultado))
        .catch(error => console.log(error));
};

obtenerDatos();

function mostrarDatos(cancion){

    console.log(cancion)


    cancion.forEach(cancion => {

        const objSong = {
            
            title: "",
            id: "",
            artist: "",
            length:"",
            albumId: "",
            img: "",
            userID: ""

        }

        objSong.id = cancion._id
        objSong.title = cancion.title
        objSong.artist = cancion.user
        objSong.length = cancion.lenght
        objSong.albumId = cancion.albumId
        objSong.img = cancion.imgSrc
        objSong.userID = cancion.userID

        camposSong(objSong);

    })

};

function camposSong(song){

    const title = [...document.querySelectorAll(".title_song")]
    const artist = [...document.querySelectorAll(".artist_song")]
    const img = [...document.querySelectorAll(".img_song")]
    const length = [...document.querySelectorAll(".length")]

    title.forEach(title => {

        if (title.id == song.id) {
            title.innerHTML = song.title;
        }

    })

    artist.forEach(artist => {
        if (artist.id == song.id) {
            artist.innerHTML = song.artist;
            }
 })
    
 img.forEach(img => {
     if (img.id == song.id) {
        
        img.src = `/images/${song.img}`;
        
         }
         })
    
    length.forEach(length => {
            if (length.id == song.id) {
                length.innerHTML = song.length;
                }
                })
    
    
};
