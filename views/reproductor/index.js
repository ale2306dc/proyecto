const progress = document.querySelector("progress");
const audio = document.querySelector("#audio");
const divRep = document.querySelector("#reproductor");
const cover = document.createElement("img");

const playButton = document.querySelector("#play_pause");
const togglePlay = playButton.children[0];

console.log(window.location.pathname)

const infoCancion = {

    img: "",
    title: "",
    artist: "",
    audio: ""

}

let id;

if (window.location.pathname == "/main/") {
    
    id = 1692947074988
    obtenerSong();

}

let artist;

playButton.addEventListener('click', () => {

    progressUpdate();

    if (audio.paused) {
    audio.play();
    togglePlay.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />`;
    } else{
        audio.pause();
        togglePlay.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />`;
    };

});


    

setTimeout(() => {    
    
    audio.addEventListener("timeupdate",progressUpdate);

    progress.addEventListener("click", progressClick);

    clickSong()

}, 200);


function obtenerSong(){

    const  url = "http://localhost:3000/api/songs";

    console.log(url);

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            llenarSong(resultado)
        }
            )
        .catch(err => console.log(err));

};

function llenarSong(song){
    
    console.log(song)

    const songData = song.find(song => song._id == id);

    console.log(songData);

    infoCancion.audio = songData.audioSrc;
    infoCancion.title = songData.title;
    infoCancion.artist = songData.user;
    infoCancion.img = songData.imgSrc;

    console.log(infoCancion);
    console.log(songData);

    mostrarHTML();

}

function mostrarHTML() {
 
    const divImg = document.querySelector("#image");
    const divTitle = document.querySelector("#title");
    const divArtist = document.querySelector("#artist");


    if (cover.src === "") {

        cover.src = `/images/${infoCancion.img}`;
        cover.classList.add("rounded-md", "h-[20rem]", "w-[20rem]");
        divImg.appendChild(cover);

    }
    else{

        cover.src = `/images/${infoCancion.img}`;

    };

    divTitle.innerHTML = infoCancion.title;
    divArtist.innerHTML = infoCancion.artist;

    console.log(cover);
    
    audio.src = `/audios/${infoCancion.audio}`;

}

function progressUpdate(){

    progress.value = (audio.currentTime / audio.duration) * 100;

    console.log(audio.currentTime);

};

function progressClick(e){
    
    const clickTime = (e.offsetX / progress.offsetWidth) * audio.duration;
    audio.currentTime = clickTime;
    console.log(e);

    console.log(audio.duration)

};

function clickSong(){

    const song = [...document.querySelectorAll(".songElmnt")];

    const reproductor = document.querySelector("#reproductor");
    const repCont = document.querySelector("#rep-cont");

    console.log(song);

    song.forEach(song => {

        song.addEventListener("click", ()=>{
            console.log("Quitar clase")
            reproductor.classList.remove("hidden");
            id = song.id;
            console.log(id);
            obtenerSong();
            audio.currentTime = 0;
            progressUpdate();
        });

    });

    window.addEventListener("click", (e) => {

        console.log(e.target == repCont)

        if (e.target == repCont) {
            console.log("Añadir clase")
            reproductor.classList.add("hidden")
        }

    } )

    
};

