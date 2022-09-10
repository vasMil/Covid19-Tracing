// Redirect to home if user has credentials saved
if(localStorage.getItem("token") || sessionStorage.getItem("token")) {
    window.location.replace(`${window.location.origin}/src/app/home-page/home.php`);
}

// Handle login event
const loginCard = document.querySelector("#login-card");
loginCard.addEventListener("successEvent", onLogin);

function onLogin(event) {
    if(event.detail != "#") {
        window.location.replace(`${window.location.origin}/src/app/home-page/home.php`);
    }
}