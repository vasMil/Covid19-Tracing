if(!localStorage.getItem("token") && !sessionStorage.getItem("token")) {
    window.location.replace(`${window.location.origin}/src/app/login-page/login.php`);
}

// Open Street Map Attribution
const osmAttrib = '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
// Get the tiles
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
const tiles = L.tileLayer(tileUrl, { attribution: osmAttrib })

// Define the map
const map = L.map('map', {
    minZoom: 5,
    maxZoom: 17
});
// Add the required tiles on the map
tiles.addTo(map);

// Set initial view to Georgiou Square - default state (in case no POIS are returned)
map.setView([38.24620061084201, 21.735099081752857], 13);

// Request for Pois
const tableBody = document.querySelector("#ec-table-body");
fetch("http://localhost:8080/pois-exposed-user-to-covid/", {
    headers: {
        'Authorization': localStorage.getItem("token") || sessionStorage.getItem("token")
      }
}).then(resp => {
    return resp.json();
}).then(respJson => {
    if (respJson.rows.length) {
        // Add rows to table
        for (let [i, row] of respJson.rows.entries()) {
            tableBody.appendChild(getTableRowElement(row, i+1));
            L.marker([row.poiLat, row.poiLng]).bindPopup(row.poiName, {
                className: `popup`
            }).addTo(map);
        }
        // Add an event listener on the table, on click
        // get the event.target element, access td with class lat, lng and set map view to those points
        tableBody.addEventListener("click", navigateToPoi);
    }
    else {
        // Remove the table and add a message informing the user that has not been exposed to the virus
        document.querySelector("#ec-table").remove();
        const div = document.createElement("div");
        div.classList = "highlight-primary";
        div.textContent = "Good news! It seems like you haven't been exposed to the virus!";
        document.querySelector(".ec-table-section").appendChild(div);
    }
}).catch(err => {
    document.querySelector("#ec-table").remove();
    const div = document.createElement("div");
    div.classList = "text-danger";
    div.textContent = "There was an error, try again later!";
    document.querySelector(".ec-table-section").appendChild(div);
})


function navigateToPoi(event) {
    const rowClicked = event.target.parentNode;
    const lat = getFirstChildElementByClass(rowClicked, "lat").textContent;
    const lng = getFirstChildElementByClass(rowClicked, "lng").textContent;
    map.setView([parseFloat(lat), parseFloat(lng)], 17);
}


/* UTILITY FUNCTIONS */
function getFirstChildElementByClass(parentNode, className) {
    for (let node of parentNode.children) {
        if (node.classList.contains(className)) return node;
    }
}


const getTableRowElement = (dbRow, counter) => {
    const node = document.createElement("tr");
    node.innerHTML = `
    <th scope="row">${counter}</th>
    <td>${dbRow.poiName}</td>
    <td>${dbRow.poiAddress}</td>
    <td>${formatTimestamp(dbRow.visitTimestamp)}</td>
    <td class="lat">${dbRow.poiLat}</td>
    <td class="lng">${dbRow.poiLng}</td>`
    return node
};

const formatTimestamp = (tstamp) => {
    const date = new Date(tstamp)
    return date.toISOString().substring(0, 19).replace('T', ' ');
}