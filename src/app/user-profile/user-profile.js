// if(!localStorage.getItem("token") && !sessionStorage.getItem("token")) {
//     window.location.replace(`${window.location.origin}/src/app/login-page/login.php`);
// } 

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