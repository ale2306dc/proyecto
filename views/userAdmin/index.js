
if(localStorage.getItem("_id") == null){

    window.location.href="/"

}
if (localStorage.getItem("_id") != "admin") {
    window.location.href = "/home/"
}

const cerrarSesion = document.querySelector("#cerrarSesion")

cerrarSesion.addEventListener("click", () => {

    localStorage.removeItem("_id")
    localStorage.removeItem("user")
    window.location.href = "/"

})

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

    if (cancion == "") {
       const text = document.querySelector("#texto")

       text.classList.remove("hidden")

       text.innerHTML = "No se ha encontrado ninguna canción"
    }

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
     <a id=${datos.id} class="songElmnr hover:bg-red-600 py-1 px-3 transition ease-in-out rounded-sm duration-300 cursor-pointer" href="/delete/#${datos.id}">
        
         <div class="hidden md:block">Eliminar</div>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:hidden w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

     </a>

 </div>
    
    `

    tracks.appendChild(songElmnt);

}
