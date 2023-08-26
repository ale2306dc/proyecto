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

    btnContainer.classList.remove("justify-between","grid-cols-2")
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
        
        <div class="flex imgBlur justify-center items-center">
                <img id="${song._id}" class="img_song rounded-sm transition ease-in-out duration-500" src="/images/${song.imgSrc}" alt="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-14 h-14 absolute bg-white rounded-md hidden hover:bg-indigo-700 hover:text-white duration-500 transition ease-in-out">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                </svg>
            </div>
                        
        <p id="${song._id}" class="title_song font-bold mt-3 text-lg">${song.title}</p>
    
        <div class="flex flex-row justify-between items-end">
            <p id="${song._id}" class="artist_song text-md">${song.user}</p>
    
        </div>
        
        `;
    
        dataCont.appendChild(dataElmnt);

    })
    
    };

