function obtenerDatos() {
    
    const url = "/api/songs";

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarDatos(resultado))
        .catch(error => console.log(error));

};

if(localStorage.getItem("_id") == null){

     window.location.href="/"

}

const welcome = document.querySelector("#welcome")

welcome.innerHTML = `Bienvenido, ${localStorage.getItem("user")}`

if (localStorage.getItem("_id") == "admin") {
    const admin = document.querySelector("#admin")

    admin.classList.remove("hidden")
} else {

    const btnContainer = document.querySelector("#btnContainer");

    btnContainer.classList.remove("justify-between","md:grid-cols-2")
    btnContainer.classList.add("justify-center")

}

const cerrarSesion = document.querySelector("#cerrarSesion")

cerrarSesion.addEventListener("click", () => {

    localStorage.removeItem("_id")
    localStorage.removeItem("user")
    window.location.href = "/"

})

obtenerDatos();

function mostrarDatos(data){

    console.log(data)

    if (data == "") {
        const text = document.querySelector("#texto")
 
        text.classList.remove("hidden")

        text.innerHTML = "No se ha encontrado ninguna canción"
     }
 

    data.forEach(song => {
        
        const dataCont = document.querySelector("#data-cont");

        const dataElmnt = document.createElement("div");
    
        dataElmnt.id = song._id;
        
        dataElmnt.classList.add("songElmnt", "w-[12rem]", "h-[18rem]", "p-3", "bg-gray-300", "flex", "flex-col", "rounded-md", "hover:cursor-pointer", "hover:bg-gray-500", "shadow-md", "shadow-slate-400", "transition", "ease-in-out", "hover:translate-y-1");

        dataElmnt.setAttribute("data-modal-toggle", "reproductor");

        dataElmnt.setAttribute("data-modal-target", "reproductor");

        dataElmnt.innerHTML = `
        
        <div class="flex imgBlur justify-center h-[10.5rem] w-[10.5rem] items-center">
                <img id="${song._id}" class="img_song rounded-sm  h-[10.5rem] w-[10.5rem] transition ease-in-out duration-500" src="/images/${song.imgSrc}">
            </div>
                        
        <p id="${song._id}" class="title_song font-bold mt-3 text-lg">${song.title}</p>
    
        <div class="flex flex-row justify-between items-end">
            <p id="${song._id}" class="artist_song text-md">${song.user}</p>
    
        </div>
        
        `;
    
        dataCont.appendChild(dataElmnt);

    })
    
    };

