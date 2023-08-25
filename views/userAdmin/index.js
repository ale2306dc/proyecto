// const album = document.querySelector("#album");
// const track = document.querySelector("#track")

// album.addEventListener("input", ()=>{
    
//     console.log(album.value);

//     if (album.value !== "default") {
//         track.classList.remove("hidden");
//     }else{
//         track.classList.add("hidden");
//     }

// })

let id;

const tracks = document.querySelector("#tracks");

function obtenerDatos() {
    
    const url = "/api/songs";

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => rellenarObj(resultado))
        .catch(error => console.log(error));
};

obtenerDatos();

function rellenarObj(cancion){

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

        mostrarDatos(objSong)

        console.log(objSong)
        }
    )
}

function mostrarDatos(datos){


    const songElmnt = document.createElement("div");

    songElmnt.classList.add("bg-indigo-900", "shadow-md", "shadow-gray-500", "text-white", "flex", "flex-row", "justify-between", "items-center", "p-2","w-auto", "h-14", "rounded-md");

    songElmnt.innerHTML = `
    
        <div class="h-12 w-12">
            <img src="/images/${datos.img}" alt="">
        </div>

        <p class="font-semibold text-xl">${datos.title}</p>
        <p>${datos.artist}</p>
        <div class="flex flex-row gap-3">
            <a id=${datos.id} class="songElmnr hover:bg-red-600 py-1 px-3 transition ease-in-out rounded-sm duration-300 cursor-pointer">
                Eliminar
            </a>
        </div>
    
    `
    clickSong()

    tracks.appendChild(songElmnt);

}
/*
function clickSong(){

    const song = [...document.querySelectorAll(".songElmnr")];

    console.log(song);

    song.forEach(song => {

        console.log(song)
        
        song.addEventListener("click", e =>{

        console.log(e);
            // await fetch(`http://localhost:3000/api/songs/${id}`, {method : "DELETE"})
            //     .then(res => res.json())
            //     .then(data => console.log(data))
            //     .catch(err => console.error(err))

            // mostrarMensaje("success", "se ha eliminado satisfactoriamente");
        });

    });
}*/

function mostrarMensaje(mensaje,tipo){

    // if (tipo == "error") {
    //     alert(mensaje)
    // }
    
    // if (tipo == "success"){
    //     alert(mensaje)
    // }

    const divMensaje = document.querySelector("#mensaje");

    if (tipo == "error") {
        divMensaje.innerHTML=`
        <div class="max-w-4xl">
            <div class="px-6 py-3 mb-4 text-lg text-white text-center rounded-lg bg-red-500 font-bold" role="alert">
                ${mensaje}
            </div>
        </div>
    `

    setTimeout(() => {
        divMensaje.innerHTML=""
    }, 3000);
    } 

    if (tipo === "success") {
        
        divMensaje.innerHTML=`
        <div class="max-w-4xl">
            <div class="px-6 py-3 mb-4 text-lg text-white text-center rounded-lg bg-green-500 font-bold" role="alert">
                ${mensaje}
            </div>
        </div>
    `

    setTimeout(() => {
        divMensaje.innerHTML=""
    }, 3000);
    }

}