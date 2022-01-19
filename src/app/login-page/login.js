if(localStorage.getItem("token") || sessionStorage.getItem("token")) {
    window.location.replace(`${window.location.origin}/src/app/home-page/home.php`);
}

const loginCard = document.querySelector("#login-card");
loginCard.addEventListener("successEvent", onLogin);

function onLogin(event) {
    window.location.replace(event.detail);
}