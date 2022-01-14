const navbarBtn = document.querySelector(".btn-navbar");
const expNavDiv = document.querySelector(".navbar-full");

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
    }
    else {
        expNavDiv.style.display = "none";
        navbarBtn.firstElementChild.classList.remove('fa-times');
        navbarBtn.firstElementChild.classList.add('fa-bars');
        isExpanded = false;
    }
}