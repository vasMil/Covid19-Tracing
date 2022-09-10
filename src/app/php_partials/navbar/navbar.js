const navbarBtn = document.querySelector(".btn-navbar");
const expNavDiv = document.querySelector(".navbar-full");
const overlay = document.querySelector(".navbar-full-overlay");
const logoutBtn = document.querySelector("#nav-logout");

navbarBtn.addEventListener("click", onClick);
logoutBtn.addEventListener("click", logout);

// false -> minimized
// true -> expanded
isExpanded = false;

function onClick(event) {
    if (!isExpanded) {
        expNavDiv.className = "navbar-full show";
        navbarBtn.firstElementChild.classList.remove('fa-bars');
        navbarBtn.firstElementChild.classList.add('fa-times');
        isExpanded = true;
        // Configure what happens when the user taps outside of the navbar
        overlay.addEventListener("click", closeNavbar);
        overlay.hidden = false;
    }
    else {
        closeNavbar();
    }
}

function closeNavbar() {
    expNavDiv.className = "navbar-full";
    navbarBtn.firstElementChild.classList.remove('fa-times');
    navbarBtn.firstElementChild.classList.add('fa-bars');
    isExpanded = false;

    // Remove overlay event listener
    overlay.removeEventListener("click", closeNavbar);
    overlay.hidden = true;
}

function logout(event) {
    localStorage.clear();
    sessionStorage.clear();
}