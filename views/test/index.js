const test = document.querySelector("#test");

test.addEventListener("submit", uploadFile);

function uploadFile(e){

    e.preventDefault();

    let formData = new FormData(); 
    formData.append("file", fileupload.files[0]);
    console.log(formData);


}