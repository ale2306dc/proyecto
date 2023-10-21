
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
    .then(()=>{
        if (localStorage.getItem("_id") == "admin") {
        window.location.href="/admin/"
    }else {
        window.location.href=`/user/#${localStorage.getItem("_id")}`
    };
}); 

})

btnNo.addEventListener("click", () => {

    if (localStorage.getItem("_id") == "admin") {
        window.location.href="/admin/"
    }else {
        window.location.href=`/user/#${localStorage.getItem("_id")}`
    }

})