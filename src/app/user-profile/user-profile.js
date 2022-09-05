// if(!localStorage.getItem("token") && !sessionStorage.getItem("token")) {
//     window.location.replace(`${window.location.origin}/src/app/login-page/login.php`);
// }

// Change password


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
    document.querySelector(".form-control.username").value = info.username;
    document.querySelector(".form-control.email").value = info.email;

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