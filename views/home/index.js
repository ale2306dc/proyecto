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

    const id = localStorage.getItem("_id")

    const adminUser = document.querySelector("#user")

    const userA = document.querySelector("#userA")

    adminUser.classList.remove("hidden")

    userA.href = `/user/#${id}`

    const adminA = document.querySelector("#adminA");
    const admin = document.querySelector("#admin")

    adminA.remove()
    admin.remove()
    // const btnContainer = document.querySelector("#btnContainer");

    // btnContainer.classList.remove("justify-between","md:grid-cols-2")
    // btnContainer.classList.add("justify-center")

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
 
        const dataCont = document.querySelector("#data-cont");

        dataCont.innerHTML = `<div class="text-5xl font-bold" id="texto">No se ha encontrado ninguna canción</div>`


     } else {

        const texto = document.querySelector("#texto");

        if (texto) {
            texto.remove()
        } 

     }

    data.forEach(song => {

        const dataCont = document.querySelector("#data-cont");

        const dataElmnt = document.createElement("div");
    
        dataElmnt.id = song._id;
        
        dataElmnt.classList.add("songElmnt", "w-[12rem]", "h-[20rem]", "justify-center",  "p-3", "bg-gray-300", "flex", "flex-col", "rounded-md", "hover:cursor-pointer", "hover:bg-gray-500", "shadow-md", "shadow-slate-400", "transition", "ease-in-out", "hover:translate-y-1");

        dataElmnt.setAttribute("data-modal-toggle", "reproductor");

        dataElmnt.setAttribute("data-modal-target", "reproductor");

        dataElmnt.innerHTML = `
        
        <div class="flex imgBlur justify-center h-[10.5rem] w-[10.5rem] items-center">
                <img id="${song._id}" class="img_song rounded-sm  h-[10.5rem] w-[10.5rem] transition ease-in-out duration-500" src="/images/${song.imgSrc}">
            </div>
                        
        <p id="${song._id}" class="title_song font-bold mt-3 text-lg">${song.title}</p>
        
    
        <div class="flex flex-col justify-between items-start">
            <p id="${song._id}" class="artist_song text-md">Autor: ${song.user}</p>
            <p id="${song._id}" class="artist_song text-md">Prof: ${song.profe}</p>
            <p id="${song._id}" class="artist_song text-md">Aula: ${song.aula}</p>
    
        </div>
        
        `;
    
        dataCont.appendChild(dataElmnt);

        clickSong()

    })
    
    };

    const buscador = document.querySelector("#buscador");

    buscador.addEventListener("input", buscarCancionDB)

    function buscarCancionDB(e) {
        
        fetch("/api/songs")
        .then(res => res.json())
        .then(data => buscarCancion(data,e))
        .catch(err => console.err(err));

    }

    function buscarCancion(datos,e) {
        
        console.log(datos);
        console.log(e.target.value);

        test = datos.filter(datos => datos.title == e.target.value);

        console.log(test);
 
        mostrarDatos(test)

        // clickSong();

    }

    const form = document.querySelector("#form"); 

    form.addEventListener("submit", formFiltrarDB)

    function formFiltrarDB(e) {

        e.preventDefault();

        fetch("/api/songs")
        .then(res => res.json())
        .then(data => formFiltrar(data))
        .catch(err => console.log(err));

    }


    function formFiltrar(datos) {

        console.log(datos);
        // console.log(e);

        const profe = document.querySelector("#profe");
        const aula = document.querySelector("#aula");

        const res = datos.filter(datos => datos.profe == profe.value && datos.aula == aula.value)

        console.log(res)

        const dataCont = document.querySelector("#data-cont");

        dataCont.innerHTML = ""

        mostrarDatos(res);

        // clickSong();

    }