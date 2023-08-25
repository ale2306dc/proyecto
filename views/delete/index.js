const btnSi = document.querySelector("#si")
const btnNo = document.querySelector("#no")
const hash = window.location.href.split('#').pop();

btnSi.addEventListener("click", () => {

    fetch(`/api/songs/${hash}`, {method : "DELETE"})
    window.location.href = "/admin/"
    

})

btnNo.addEventListener("click", () => {

    window.location.href = "/admin/"

})