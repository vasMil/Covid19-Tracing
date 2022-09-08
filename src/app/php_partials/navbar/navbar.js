const navbarBtn = document.querySelector(".btn-navbar");
const expNavDiv = document.querySelector(".navbar-full");
const overlay = document.querySelector(".navbar-full-overlay");

navbarBtn.addEventListener("click", onClick);

// false -> minimized
// true -> expanded
isExpanded = false;

function onClick(event) {
    if (!isExpanded) {
        expNavDiv.style.display = "flex";
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
    expNavDiv.style.display = "none";
    navbarBtn.firstElementChild.classList.remove('fa-times');
    navbarBtn.firstElementChild.classList.add('fa-bars');
    isExpanded = false;

    // Remove overlay event listener
    overlay.removeEventListener("click", closeNavbar);
    overlay.hidden = true;
}