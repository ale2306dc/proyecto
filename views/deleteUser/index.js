
const hash = window.location.href.split('#').pop();

function obtenerDatos(){

    fetch("/api/users")
        .then(res => res.json())
        .then(data => rellenarObj(data))
        .catch(err => console.error(err))

}

if(localStorage.getItem("_id") == null){

    window.location.href="/"

}

obtenerDatos();

function rellenarObj(datos){


    const userData = datos.find( datos => datos._id == hash);

    console.log(userData);

    const userObj = {

        id: userData._id,
        email: userData.email,
        name: userData.user
    
    }

    llenarDatos(userObj);

}

function llenarDatos(userObj) {
    
   const id =  document.querySelector("#id");
   const email =  document.querySelector("#email");
   const user =  document.querySelector("#user");

   id.innerHTML = userObj.id;
   email.innerHTML = userObj.email;
   user.innerHTML = userObj.name;

};

const btnSi = document.querySelector("#si");
const btnNo = document.querySelector("#no");

btnSi.addEventListener("click", () => {

    fetch(`/api/users/${hash}`, {method:"DELETE"})
    .then(()=>{window.location.href="/admin/";})

})

btnNo.addEventListener("click", () => {

    window.location.href="/admin/"

})