// if(!localStorage.getItem("token") && !sessionStorage.getItem("token")) {
//     window.location.replace(`${window.location.origin}/src/app/login-page/login.php`);
// }

let req = {
    old_password: undefined,
    new_username: undefined,
    new_password: undefined,
}

const formUsername = document.getElementById("prof-form-username");
const formEmail = document.getElementById("prof-form-email");
const formPassword = document.getElementById("prof-form-password");

const modalPassword = document.getElementById("modal-password");
const modalClose = document.querySelector("#modal-close"); // I do not require the object to be alive thus I am using querySelector
const modalConfirm = document.querySelector("#modal-confirm");

const respContainer = document.getElementById('response-messages-container');

// Setup modal buttons
modalClose.addEventListener("click", () => {
    $("#confirmPasswordModal").modal("hide");
});

modalConfirm.addEventListener("click", sendReqToApi);

async function sendReqToApi() {
    $("#confirmPasswordModal").modal("hide");
    req.old_password = modalPassword.value;
    const resp = await fetch(
        "http://localhost:8080/user-profile/",
        {
            method: 'PUT',
            headers: {
                'Authorization': localStorage.getItem("token") || sessionStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        });    
    
    const respJson = await resp.json();
    // Show the message container
    respContainer.hidden = false;

    // Handle wrong old password
    if(respJson.invalid_password) {
        messageFactory("text-danger", req.new_password ? "The old password you provided was wrong!" : "Wrong password!");
        return;
    }

    // Handle username update
    if(respJson.username_updated && req.new_username) {
        messageFactory("highlight-primary", "Username update was successful!");
        current_username = req.new_username;
        if(localStorage.getItem("token")) {
            localStorage.setItem("token", "Bearer " + respJson.new_token);
        }
        else if(sessionStorage.getItem("token")) {
            sessionStorage.setItem("token", "Bearer " + respJson.new_token);
        }
        else {
            console.log("Token did not update!");
            // TODO: Logout
        }
    }
    else if(!respJson.username_updated && req.new_username && respJson.usernameUsed) {
        formUsername.value = current_username;
        messageFactory("text-danger", `Username <i>${req.new_username}</i> alredy used!`);
    }
    else if(!respJson.username_updated && req.new_username) {
        messageFactory("text-danger", "Username update failed!");
    }

    // Handle password update
    if(respJson.password_updated && req.new_password) {
        messageFactory("highlight-primary", "Password update was successful!");
    }
    else if(!respJson.password_updated && req.new_password) {
        messageFactory("text-danger", "Password update failed!");
    }

    // Cleanup after request
    modalPassword.value = "";
    formPassword.value = "";
    req.new_password = undefined;
    req.new_username = undefined;
    req.old_password = undefined;
}

// Append divs that contain a message and a class into respContainer
function messageFactory(className, message) {
    let newNode = document.createElement("div");
    newNode.className = className;
    newNode.innerHTML = message;
    respContainer.appendChild(newNode);
}

// Keep the state of the username, so you may know if it has been changed
let current_username;

// Change username/password
const updateBtn = document.querySelector("#prof-update-info");
updateBtn.addEventListener("click", submitUpdateRequest);

function submitUpdateRequest(event) {
    event.preventDefault();
    // Clear and hide the container with the old responses
    respContainer.hidden = true;
    // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    while (respContainer.lastElementChild) {
        respContainer.removeChild(respContainer.lastElementChild);
    }

    // Configure the req object
    if(formPassword.value != "" && validatePassword(formPassword.value)) {
        req.new_password = formPassword.value;
    }
    if(formUsername.value != current_username) {
        req.new_username = formUsername.value;
    }

    // Check if there are any updates
    if(req.new_username == undefined && req.new_password == undefined) {
        messageFactory("text-danger", "Nothing to update!");
        respContainer.hidden = false;
        return;
    }

    // Ask for the old password in order to verify the user
    $("#confirmPasswordModal").modal('show')
}

function validatePassword(password) {
    let passHelpMsg = document.querySelector("#passwordHelp")
    let passInvalidMsg = document.querySelector("#prof-password-invalid")
    const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$*&@])[A-Za-z0-9#$*&@]{8,}$');
    if(passwordRegex.test(password)) {
        // Valid password
        passHelpMsg.hidden = false;
        passInvalidMsg.hidden = true;
        return true;
    }
    // Remove the info (muted text)
    passHelpMsg.hidden = true;
    // Show the invalid password message
    passInvalidMsg.hidden = false;
    return false;
}

// Add data to the page
(async () => {
    const resp = await fetch(
    "http://localhost:8080/user-profile/",
    {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem("token") || sessionStorage.getItem("token")
        }
    });

    const info = await resp.json();
    formUsername.value = info.username;
    formEmail.value = info.email;
    current_username = info.username;
    let regLocCollapseArea = document.querySelector("#collapse-registered-locations");
    info.visited_pois.forEach(poi => {
        let dateObj = new Date(poi.timestamp);
        // Canonicalize: Date(ISO string) assumes UTC as the timezone
        // but from database, since the data type is DATETIME
        // I retrieve a string in ISO format but with the local timezone.
        // Date.getTimezoneOffset() will return the difference localTimezone - UTC
        // in minutes. I divide with 60 to get the hours and add the offset to the
        // created Date object.
        dateObj.setHours(dateObj.getHours() + dateObj.getTimezoneOffset()/60);
        let card = 
        `<div class="card card-body" 
            tabindex="0" 
            data-toggle="tooltip" 
            data-placement="top" 
            title="${dateObj.toLocaleString()}">
            ${poi.name}
        </div>`
        regLocCollapseArea.innerHTML += card;
    });
    let daysPositiveCollapse = document.querySelector("#collapse-days-positive");
    info.was_positive_covid.forEach(day => {
        let dateObj = new Date(day.date);
        dateObj.setHours(dateObj.getHours() + dateObj.getTimezoneOffset()/60);
        let card = document.createElement("div");
        card.className = "card card-body";
        card.textContent = dateObj.toLocaleString();
        daysPositiveCollapse.appendChild(card);
    });
})();

// Change the fontawesome icon on collapse
const locRegCollapse = document.getElementById("btn-registered-locations");
const daysPosCollapse = document.getElementById("btn-days-positive");
locRegCollapse.addEventListener("click", updateFontawesomeIcon);
daysPosCollapse.addEventListener("click", updateFontawesomeIcon);

async function updateFontawesomeIcon(event) {
    let btn = event.target;
    let icon = event.target;
    if(icon.tagName == 'I') {
        btn = event.target.parentElement;
    }
    else {
        icon = btn.querySelector(".fas");
    }
    if (btn.className == "btn-custom-collapse") {
        icon.className = "fas fa-angle-up";
    }
    else {
        icon.className = "fas fa-angle-down";
    }
}

// Remove the slash from fontawesome icon and show the password
const eyeBtn = document.getElementById("prof-show-pass");
eyeBtn.addEventListener("click", updateEyeIcon);
eyeBtn.passInp = formPassword;

const modalEyeBtn = document.getElementById("modal-password-btn");
modalEyeBtn.addEventListener("click", updateEyeIcon);
modalEyeBtn.passInp = modalPassword;

function updateEyeIcon(event) {
    event.preventDefault();
    let eyeIcon;
    let inp;
    if (event.target.className != "btn-pass") {
        eyeIcon = event.target;
        inp = event.target.parentElement.passInp;
    }
    else {
        eyeIcon = event.target.childNodes[0];
        inp = event.target.passInp;
    }
    if(eyeIcon.className == "fas fa-eye-slash") {
        inp.type = "text";
        eyeIcon.className = "fas fa-eye";
    }
    else {
        inp.type = "password";
        eyeIcon.className = "fas fa-eye-slash";
    }
}