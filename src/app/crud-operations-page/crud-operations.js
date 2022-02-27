if(!localStorage.getItem("token") && !sessionStorage.getItem("token")) {
    window.location.replace(`${window.location.origin}/src/app/login-page/login.php`);
}

// Insert POIs
const formInsert = document.querySelector("#insert-pois");
formInsert.addEventListener("submit", (event) => {
    event.preventDefault();
});
const inpInsert = document.querySelector("#input-insert-pois");
inpInsert.addEventListener("change", fileUploaded);
const btnInsert = document.querySelector("#btn-insert-pois");
btnInsert.addEventListener("click", submitFile);

// Update POIs
const formUpdate = document.querySelector("#update-pois");
formUpdate.addEventListener("submit", (event) => {
    event.preventDefault();
});
const inpUpdate = document.querySelector("#input-update-pois");
inpUpdate.addEventListener("change", fileUploaded);
const btnUpdate = document.querySelector("#btn-update-pois");
btnUpdate.addEventListener("click", updatePois);


// Delete POIs
const btnDelete = document.querySelector("#btn-delete-pois");
btnDelete.addEventListener("click", deletePois);

async function deletePois(event) {
    event.preventDefault();
    try {
        const resp = await fetch("http://localhost:8080/delete-pois", {
            method: "DELETE",
            headers: {
                'Authorization': localStorage.getItem("token") || sessionStorage.getItem("token")
            }
        });
        const respJson = await resp.json();
        if (resp.ok) {
            consoleSuccess("Delete POIs", "Success!", `${respJson.message}`);
        }
        else {
            consoleDanger("Delete POIs", "Failed!", `Err: ${respJson.message}`);
        }
    }
    catch(err) {
        consoleDanger("Delete POIs", "Failed!", `Err: Server is probably down!`);
    }
}

/* UTILITY FUNCTIONS */
async function submitFile(event) {
    const data = new FormData();
    data.append('pois', inpInsert.files[0]);
    const lm_obj = new Date(inpInsert.files[0].lastModified);
    const lm_str = lm_obj.toISOString().substring(0, 19).replace('T', ' ');
    data.append('last_modified', lm_str);
    try {
        const resp = await fetch("http://localhost:8080/insert-pois", {
            method: "POST",
            headers: {
                'Authorization': localStorage.getItem("token") || sessionStorage.getItem("token")
                // DO NOT ADD Content-type, it is automatically inserted by the browser, with the correct boundary
                // https://muffinman.io/blog/uploading-files-using-fetch-multipart-form-data/
            },
            body: data
        });
        if (resp.ok) {
            consoleSuccess("Insert POIs", "Success!");
        }
        else {
            const respJson = await resp.json();
            consoleDanger("Insert POIs", "Failed!", `Err: ${respJson.message}`);
        }
    } catch(err) {
        consoleDanger("Insert POIs", "Failed!", `Err: Server is probably down!`);
    }
}

async function updatePois(event) {
    const data = new FormData();
    data.append('pois', inpUpdate.files[0]);
    const lm_obj = new Date(inpUpdate.files[0].lastModified);
    const lm_str = lm_obj.toISOString().substring(0, 19).replace('T', ' ');
    data.append('last_modified', lm_str);
    try {
        const resp = await fetch("http://localhost:8080/update-pois", {
            method: "PUT",
            headers: {
                'Authorization': localStorage.getItem("token") || sessionStorage.getItem("token")
            },
            body: data
        });
        const respJson = await resp.json();
        if (resp.ok) {
            let args = ["Update POIs", "Success!"];
            if (respJson.message !== null) {
                args.push(`Note: ${respJson.message}`);
            }
            consoleSuccess(...args);
        }
        else {
            consoleDanger("Update POIs", "Failed!", `Err: ${respJson.message}`);
        }
    } catch(err) {
        consoleDanger("Update POIs", "Failed!", `Err: Server is probably down!`);
    }
}

function fileUploaded(event) {
    // Get the btn element, which is a sibling of the event target
    // This requires the input field to be a sibling CLOSEST TO THE PARENT
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

const console = document.querySelector(".console");

const consoleSuccess = (textBefore="", textHighlighted="", textAfter="") => {
    const msgEl = document.createElement("div");
    msgEl.classList = "console-text";
    msgEl.innerHTML = 
        `${textBefore}
        <span class="console-success">
            ${textHighlighted}
        </span>
        ${textAfter}`;
    console.appendChild(msgEl);
    msgEl.scrollIntoView();
};

const consoleDanger = (textBefore="", textHighlighted="", textAfter="") => {
    const msgEl = document.createElement("div");
    msgEl.classList = "console-text";
    msgEl.innerHTML = 
        `${textBefore}
        <span class="console-danger">
            ${textHighlighted}
        </span>
        ${textAfter}`;
    console.appendChild(msgEl);
    msgEl.scrollIntoView();
};