//#region Selectores

//Botones
const formLog = document.querySelector("#formLogin");
const formReg = document.querySelector("#formReg");
const btnReg = document.querySelector("#btnReg");

//Login
const loginEmail = document.querySelector("#login-email");
const loginPass = document.querySelector("#login-pass");

//Registro
const signEmail = document.querySelector("#reg-email");
const signUser = document.querySelector("#reg-user");
const signPass = document.querySelector("#reg-pass");
const signConfirm = document.querySelector("#reg-confirm");

//#endregion

//#region Regex

    const emailVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const passVal = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm
    const userVal = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/

//#endregion

//#region Inputs 

let valname = false;
let valpass = false;
let valemail = false;
let valmatch = false;

signUser.addEventListener('input', e => {
    
    console.log(e.target.value, valname);
    valname = userVal.test(e.target.value);
    validar(signUser, valname)

})

signEmail.addEventListener('input', e => {
    console.log(e.target.value);
    valemail = emailVal.test(e.target.value)
    validar(signEmail, valemail)

})

signPass.addEventListener('input', e => {
    console.log(e.target.value);

    valpass = passVal.test(e.target.value)

    validar(signConfirm, valmatch);
    validar(signPass, valpass)
})

signConfirm.addEventListener('input', e => {
    console.log(e.target.value);
    valmatch = e.target.value === signPass.value;

    //validar(signPass, valpass)
    validar(signConfirm, valmatch);
})


const validar = (input, val) => {

    btnReg.disabled = valname && valemail && valpass && valmatch ? false : true;

    if (input.value === '') {
        input.classList.add('focus:outline-indigo-900')
        input.classList.remove("focus:outline-red-700",'outline-red-700', 'outline-4', 'outline');
        input.classList.remove('focus:outline-green-700', 'outline-green-700', 'outline-4', 'outline');
    } else if (val) {
        input.classList.remove('focus:outline-indigo-900');
        input.classList.add('focus:outline-green-700', 'outline-green-700', 'outline-4', 'outline');
        input.classList.remove("focus:outline-red-700",'outline-red-700', 'outline-4', 'outline');
    } else {
        input.classList.remove('focus:outline-indigo-900');
        input.classList.remove('focus:outline-green-700', 'outline-green-700', 'outline-4', 'outline');
        input.classList.add("focus:outline-red-700",'outline-red-700', 'outline-4', 'outline')
    }
}



//#endregion

//#region Crear Usuario

formReg.addEventListener("submit", async e => {

    e.preventDefault();

    const objForm = {

        email: signEmail.value,
        user: signUser.value,
        pass: signPass.value,
        _id: Date.now()

    }

    const url = "/api/users"
    const response = await fetch(url);
    const users = await response.json();
    const email = users.find(users => users.email === signEmail.value);
    const username = users.find(users => users.user === signUser.value);

    console.log(username)

    const valEmail = emailVal.test(signEmail.value);
    const valPass = passVal.test(signPass.value);
    const valUser = userVal.test(signUser.value);
    const conPass = signPass.value === signConfirm.value

    if (signEmail.value === "" || signPass.value === "" || signUser.value === "" || signConfirm.value === "") {
        mostrarMensaje("Todos los campos son obligatorios", "error");
    } else {
        if (valEmail && valPass && valUser) {

            if (conPass) {
                    if (email || username) {
                    mostrarMensaje("Esta cuenta ya está registrada", "error");
                } else {
                    fetch(url, {

                        method: "POST",
                        headers:{
                            "Content-Type": "application/json"
                        },
                        body:JSON.stringify(objForm)

                    })
                        .then(res => res.json())
                        .then(data => console.log(data))
                        .catch(err => console.log(err))
                    mostrarMensaje("Se ha registrado exitosamente", "success");

                    const objPlaylist = {

                        _id:objForm._id,
                        user:objForm.user

                    }

                    fetch("http://localhost:3000/api/playlist", {

                        method: "POST",
                        headers: {

                            "Content-Type" : "application/json"

                        },
                        body:JSON.stringify(objPlaylist)

                    }).then(res => res.json())
                      .then(data => console.log(data))
                      .then(err => console.log(err));

                    signEmail.value = "";
                    signPass.value = "" ;
                    signUser.value = ""; 
                    signConfirm.value = "";
                }
            } else {
                mostrarMensaje("Las contraseñas no coinciden", "error");
            }

      } else {
        mostrarMensaje("Asegurese de cumplir todos los requisitos", "error");

        console.log("Pass:" +  valPass + signPass.value, "Email: " +  valEmail + signEmail.value,"User: " + valUser + signUser.value);
      }

    }



}
);

//#endregion

//#region Login

    formLog.addEventListener("submit", async e => {
        e.preventDefault();

        const url = "/api/users/"
        const response = await fetch(url, {method: "GET"});
        const users = await response.json();
        const email = users.find(user => user.email === loginEmail.value);
        console.log(email);
        const pass = email.pass == loginPass.value
        console.log(pass);

        if (loginEmail.value === "" || loginPass.value === "") {
            mostrarMensaje("Todos los campos son obligatorios", "error");
        } else {
            if (email && pass) {
                if (pass) {
                    localStorage.setItem('_id', `${email._id}`);
                    localStorage.setItem('user', `${email.user}`);
                    window.location.href = "/home/"
                } else {
                    mostrarMensaje("Email o contraseña incorrecta, vuelva a intentar", "error");
                }
        } else {
            mostrarMensaje("El usuario no existe", "error");
        }
    }
    })

//#endregion

//#region Mensaje

    function mostrarMensaje(text,type) {
        
        const divMensaje = document.querySelector("#mensaje");

        if (type === "error") {
            divMensaje.innerHTML=`
            <div class="max-w-4xl">
                <div class="px-6 py-3 mb-4 text-lg text-white text-center rounded-lg bg-red-500 font-bold" role="alert">
                    ${text}
                </div>
            </div>
        `

        setTimeout(() => {
            divMensaje.innerHTML=""
        }, 3000);
        } 

        if (type === "success") {
            
            divMensaje.innerHTML=`
            <div class="max-w-4xl">
                <div class="px-6 py-3 mb-4 text-lg text-white text-center rounded-lg bg-green-500 font-bold" role="alert">
                    ${text}
                </div>
            </div>
        `

        setTimeout(() => {
            divMensaje.innerHTML=""
        }, 3000);
        }

    }

//#endregion