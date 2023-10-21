const title = document.querySelector("#title");
const profe = document.querySelector("#profe");
const aula = document.querySelector("#aula");
const form = document.querySelector("#form");

const hash = window.location.href.split('#').pop();

const btnUpload = document.querySelector("#btnUpload");

const cerrarSesion = document.querySelector("#cerrarSesion")

buscarCancion()

function buscarCancion(){

  fetch("/api/songs")
  .then(res => res.json())
  .then(data => filtrarCancion(data))
  .catch(err => console.log(err))

}

function filtrarCancion(datos){

  const res = datos.find(datos => datos._id == hash)

  console.log(res);

  rellenarCampos(res)

}

function rellenarCampos(res){

  title.value = res.title
  profe.value = res.profe
  aula.value = res.aula

}

cerrarSesion.addEventListener("click", () => {

    localStorage.removeItem("_id")
    localStorage.removeItem("user")
    window.location.href = "/"

})

if(localStorage.getItem("_id") == null){

  window.location.href="/"

}

form.addEventListener("submit", uploadFile);

async function uploadFile(e) {

  e.preventDefault();
  
    if (!title.value || !profe.value || !aula.value) {
    
      mostrarMensaje("Todos los campos son obligatorios", "error")
      return;

    }
  
    console.log("epa")

    rellenarObj();

};

function rellenarObj(){

  const datosCancion = {

    profe: profe.value,
    aula: aula.value,
    title: title.value,

  };

  console.log(datosCancion)

  subirCancion(datosCancion);
  
}

async function subirCancion(objCancion){

  console.log(objCancion);

  const urlCancion = `/api/songs/${hash}`

  await fetch(urlCancion, {

    method:"PATCH",
    headers:{
      "Content-Type": "application/json"
    },
    body:JSON.stringify(objCancion)

  })
  .then(res=>res.json())
  .then(data => mostrarMensaje("La canción se ha actualizado correctamente","success"))
  .catch(err => mostrarMensaje(err,"error"))

}

function mostrarMensaje(mensaje,tipo){

      const divMensaje = document.querySelector("#mensaje");

      if (tipo == "error") {
          divMensaje.innerHTML=`
          <div class="max-w-4xl flex justify-center">
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
