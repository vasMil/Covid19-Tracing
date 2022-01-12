// Retrieve the section where the map will exist
const mapSection = document.querySelector(".home-map");
// Open Street Map Attribution
const osmAttrib = '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
// Get the tiles
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
const tiles = L.tileLayer(tileUrl, { attribution: osmAttrib })

// Create a custom marker
const pegmanIcon = L.icon({
    iconUrl: '../../../resources/pegman.png',
    iconSize:     [20, 42],
    iconAnchor:   [10, 21],
    popupAnchor:  [10, 21]
});

// Define the map
const map = L.map('map', {
    minZoom: 5,
    maxZoom: 17
});
// Add the required tiles on the map
tiles.addTo(map);

// TODO: Watch for user's location https://w3c.github.io/geolocation-api/#watchposition-method
let userLocation = navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);

function positionCallback(position) {
    // Retrieve the usefull info
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    // Setup a marker pointing at user's location
    L.marker([lat, lng], {
        title: "Your current position",
        alt: "Your current position",
        icon: pegmanIcon,
        riseOnHover: true
    }).addTo(map);
    
    // Set the view of the map
    map.setView([lat, lng], 12);

    // Define a circle with a radius of 5km
    const circleViewOverlay = L.circle([lat, lng], {
        color: 'red',
        fillColor: '#f03',
        opacity: 0.1,
        radius: 5000
    }).bindPopup("5km radius");
    map.addControl(circleViewOverlay);

    // Setup an event handler that will remove the circle overlay when zoom is > 12
    map.on('zoomend', () => {
        if (map.getZoom() > 12) {
            map.removeControl(circleViewOverlay);
        }
        else {
            map.addControl(circleViewOverlay);
        }
    });
}

function errorCallback(error) {
    let message = "";
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = `Geolocation is required for the app to function correctly. Please allow access to your location.`;
            break;

        case error.POSITION_UNAVAILABLE:
            message = `Your position is not available right now!`;
            break;
        
        default:
            message = `Geolocation is required for the app to function correctly!`;
    }
    mapSection.firstElementChild.remove();
    const errorDiv =  document.createElement('div');
    errorDiv.textContent = message;
    errorDiv.classList.add("text-danger");
    mapSection.appendChild(errorDiv);
}