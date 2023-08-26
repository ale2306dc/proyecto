
const hash = window.location.href.split('#').pop();

function obtenerDatos(){

    fetch("/api/songs")
        .then(res => res.json())
        .then(data => rellenarObj(data))
        .catch(err => console.error(err))

}

if(localStorage.getItem("_id") == null){

    window.location.href="/"

}

obtenerDatos();

function rellenarObj(datos){


    const songData = datos.find( datos => datos._id == hash);

    console.log(songData);

    const songObj = {

        img: songData.imgSrc,
        title: songData.title,
        artist: songData.user,
    
    }

    llenarDatos(songObj);

}

function llenarDatos(songObj) {
    
   const img =  document.querySelector("#img");
   const title =  document.querySelector("#title");
   const user =  document.querySelector("#user");

   img.src = `/images/${songObj.img}`;
   title.innerHTML = songObj.title;
   user.innerHTML = songObj.artist;

};

const btnSi = document.querySelector("#si");
const btnNo = document.querySelector("#no");

btnSi.addEventListener("click", () => {

    fetch(`/api/songs/${hash}`, {method:"DELETE"})
    .then(()=>{window.location.href="/admin/";})

})

btnNo.addEventListener("click", () => {

    window.location.href="/admin/"

})