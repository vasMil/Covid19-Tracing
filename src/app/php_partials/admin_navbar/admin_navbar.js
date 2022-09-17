const logout = document.getElementById("nav-logout");

logout.addEventListener("click", () => {
    localStorage.clear();
    sessionStorage.clear();
})
