const songs = document.querySelector("#songs");

function mostrarSongs(){

    const url = "http://localhost:3000/api/songs"

    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data)) 
        .catch(err => console.log(err))

}

function test(data){

    data.filter( data => data.userID != )

}

mostrarSongs();

