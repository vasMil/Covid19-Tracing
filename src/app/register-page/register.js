if(localStorage.getItem("token") || sessionStorage.getItem("token")) {
    window.location.replace(`${window.location.origin}/src/app/home-page/home.php`);
}

const loginCard = document.querySelector("#register-card");
loginCard.addEventListener("successEvent", onLogin);

function onLogin(event) {
    if(event.detail) {
        window.location.replace(`${window.location.origin}/src/app/login-page/login.php`);
    }
}