// Redirect to home if user has credentials saved
if(localStorage.getItem("token") || sessionStorage.getItem("token")) {
    window.location.replace(`${window.location.origin}/src/app/home-page/home.php`);
}

// Handle login event
const loginCard = document.querySelector("#login-card");
loginCard.addEventListener("successEvent", onLogin);

function onLogin(event) {
    window.location.replace(event.detail);
}

// Handle Join Us - Register
const joinUsButton = document.querySelector("#join-us-button");
joinUsButton.addEventListener("click", onRegister);

function onRegister(event) {
    window.location.replace("/src/app/register-page/register.php");
}