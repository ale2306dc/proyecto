const btnSi = document.querySelector("#si")
const btnNo = document.querySelector("#no")

btnSi.addEventListener("click", () => {

    fetch("/api/songs", {method : "DELETE"})
    window.location.href = "/admin/"

})

btnNo.addEventListener("click", () => {

    window.location.href = "/admin/"

})