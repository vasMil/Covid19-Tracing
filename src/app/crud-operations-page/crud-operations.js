if(!localStorage.getItem("token") && !sessionStorage.getItem("token")) {
    window.location.replace(`${window.location.origin}/src/app/login-page/login.php`);
}

// Insert POIs
const formInsert = document.querySelector("#insert-pois").addEventListener("submit", (event) => {
    event.preventDefault();
});
const inpInsert = document.querySelector("#input-insert-pois");
inpInsert.addEventListener("change", fileUploaded);
const btnInsert = document.querySelector("#btn-insert-pois");
btnInsert.addEventListener("click", submitFile);



/* UTILITY FUNCTIONS */
async function submitFile(event) {
    const data = new FormData();
    data.append('pois', inpInsert.files[0]);
    const lm_obj = new Date(inpInsert.files[0].lastModified);
    const lm_str = lm_obj.toISOString().substring(0, 19).replace('T', ' ');;
    data.append('last_modified', lm_str);
    const resp = await fetch("http://localhost:8080/insert-pois", {
        method: "POST",
        headers: {
            'Authorization': localStorage.getItem("token") || sessionStorage.getItem("token")
            // DO NOT ADD Content-type, it is automatically inserted by the browser, with the correct boundary
            // https://muffinman.io/blog/uploading-files-using-fetch-multipart-form-data/
        },
        body: data
    });
    console.log(await resp.json());
}

function fileUploaded(event) {
    // Get the btn element, which is a sibling of the event target
    // This requires the input filed to be a sibling CLOSEST TO THE PARENT
    // than the submit button
    const idReg = /^btn-.*-pois$/;
    let submBtn = event.target.nextElementSibling;
    while(!idReg.test(submBtn.id) && submBtn.nextElementSibling) {
        submBtn = submBtn.nextElementSibling;
    }

    // If there are no files uploaded or they are of the wrong type (extension),
    // then do not enable the button
    const isJsonReg = /.*\.json$/;
    if (!this.files.length || !isJsonReg.test(this.files[0].name)) {
        submBtn.disabled = true;
        return;
    }
    // Enable the button
    submBtn.disabled = false;
}