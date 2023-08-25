const title = document.querySelector("#title");
const cover = document.querySelector("#image");
const audio = document.querySelector("#audio");
const form = document.querySelector("#form");

const urlAudio = "/api/audio/";
const urlImg = "/api/images/";

const btnUpload = document.querySelector("#btnUpload");

cover.addEventListener("change", () => {

  const files = cover.files[0];

  const filePre = document.querySelector("#imgPre");

  console.log(files)

  const url = URL.createObjectURL(files);

  if (!files){

    filePre.src = ""
    return;

  };

  filePre.src = url;

})

audio.addEventListener("change", () => {

  const files = audio.files[0];

  const filePre = document.querySelector("#audioPre");

  console.log(files);

  const url = URL.createObjectURL(files);

  if (!files){

    filePre.src = ""
    return;

  };

  filePre.src = url;



});

form.addEventListener("submit", uploadFile);

async function uploadFile(e) {

  e.preventDefault();
  
    if (!title.value || !audio.files || !cover.files) {
    
      mostrarMensaje("Todos los campos son obligatorios", "error")
      return;

    }
  
    console.log("epa")

    

    let fileImg = cover.files[0]
    let fileAudio = audio.files[0]
 
    let userID = localStorage.getItem("_id");

let formImg = new FormData(); 
formImg.append("title", title.value);
formImg.append("file", fileImg);
formImg.append("_id", Date.now());
formImg.append("userID", userID);

let formAudio = new FormData(); 
formAudio.append("title", title.value);
formAudio.append("file", fileAudio);
formAudio.append("_id", Date.now());
formAudio.append("userID", userID);

console.log(formAudio);

console.log(formImg.get("title"));
console.log(formImg.get("file"));

console.log(formAudio.get("title"));
console.log(formAudio.get("file"));

await fetch(urlAudio, {
  method: "POST", 
  body: formAudio
})

subirImg(formImg, formAudio.get("_id"));

};

async function subirImg(form, IDAudio) {
  
  console.log(form)
  console.log(IDAudio)

  await fetch(urlImg, {
    method: "POST", 
    body: form
  }) .then(res=>res.json())
  .catch(err => mostrarMensaje(err,"error"))

  await fetch(urlImg+form.get("_id"), {

    method: "GET",
    
  }).then(res => res.json())
    .then(data => subirAudio(data, IDAudio))
    .catch(err => mostrarMensaje(err,"error"))

}

async function subirAudio(objImg, IDAudio){

  console.log("Subir Cancion")

  console.log(objImg)
  console.log(IDAudio)

  await fetch(urlAudio+IDAudio, {

    method: "GET",
    
  }).then(res => res.json())
    .then(data => rellenarObj(data, objImg))
    .catch(err => mostrarMensaje(err,"error"))

}


function rellenarObj(objAudio, objImg){

  const datosCancion = {

    _id: Date.now(),
    title: title.value,
    userID: localStorage.getItem("_id"),
    imgSrc: objImg.filename,
    audioSrc: objAudio.filename,
    user: localStorage.getItem("user")

  };

  console.log(datosCancion)

  subirCancion(datosCancion);
  
}

async function subirCancion(objCancion){

  console.log(objCancion);

  const urlCancion = "/api/songs"

  let test = 
     {
      _id: objCancion._id,
    "title": objCancion.title,
    "userID": objCancion.userID,
    "genre": objCancion.genre,
    "imgSrc": objCancion.imgSrc,
    "audioSrc": objCancion.audioSrc,
    "albumID": objCancion.albumID
    }
  
    console.log(test)

  await fetch(urlCancion, {

    method:"POST",
    headers:{
      "Content-Type": "application/json"
    },
    body:JSON.stringify(objCancion)

  })
  .then(res=>res.json())
  .then(data => mostrarMensaje("La canción se ha subido correctamente","success"))
  .catch(err => mostrarMensaje(err,"error"))

}

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

