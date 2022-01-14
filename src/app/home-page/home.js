// Retrieve the section where the map will exist
const mapSection = document.querySelector(".home-map");
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

// TODO: Watch for user's location https://w3c.github.io/geolocation-api/#watchposition-method
navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
const userPos = {
    lat: null,
    lng: null
}

function positionCallback(position) {
    // TODO: Use actual position - Retrieve the usefull info
    // userPos.lat = position.coords.latitude;
    // userPos.lng = position.coords.longitude;
    userPos.lat = 38.23786987257117;
    userPos.lng = 21.730516184225525;
    // Setup a marker pointing at user's location
    L.marker([userPos.lat, userPos.lng], {
        title: "Your current position",
        alt: "Your current position",
        icon: pegmanIcon,
        riseOnHover: true
    }).addTo(map);
    
    // Set the view of the map
    map.setView([userPos.lat, userPos.lng], 12);

    // Define a circle with a radius of 5km
    const circleViewOverlay = L.circle([userPos.lat, userPos.lng], {
        color: 'red',
        fillColor: '#f03',
        opacity: 0.1,
        radius: 5000
    }).bindPopup("5km radius");
    map.addControl(circleViewOverlay);

    const circleViewOverlay2 = L.circle([userPos.lat, userPos.lng], {
        color: 'blue',
        fillColor: '#689ec4',
        opacity: 0.1,
        radius: 20
    }).bindPopup("20m radius");
    map.addControl(circleViewOverlay2);

    // Setup an event handler that will remove the circle overlay when zoom is > 12
    map.on('zoomend', () => {
        if (map.getZoom() > 12) {
            map.removeControl(circleViewOverlay);
        }
        else {
            map.addControl(circleViewOverlay);
        }
    });

    initSearchForm();
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

// Js for search form
async function initSearchForm() {
    document.querySelector("#search-pois-form").addEventListener('submit', (event) => {event.preventDefault()});
    const searchButton = document.querySelector("#search-pois-btn");
    const searchInput = document.querySelector("#search-pois-inp")
    searchButton.addEventListener('click', searchPois);

    async function searchPois(event) {
        const searchStr = searchInput.value;
        const now = new Date();
        const response = await fetch(
            `http://localhost:8080/pois/search/?type=${searchStr}&day=${now.getDay()}&hour=${now.getHours()}&lat=${userPos.lat}&lng=${userPos.lng}`,
            {
                headers: {
                    'Authorization': localStorage.getItem("token")
            }
        });
        const respJson = await response.json();
        const pois = respJson.rows;
        clearMarkers();
        // placeProofPins(respJson.info, map);
        for (let [i,poi] of pois.entries()) {
            markerFactory(poi.name, poi.estimation, poi.approximation, i, pois.length, poi.latitude, poi.longitude);
        }
    }
}

// UTILITY FUNCTIONS
function markerFactory(poiName, estimation, approximation, index, numOfPois, lat, lng) {
    const icon = getMarkerIcon(index, numOfPois);
    // Determine whether the marker isClose to the user location (aka within 20 meters)
    let isClose = false;
    const radiusInKm = 0.02;
    const [min_lat, ] = destinationPoint(lat, lng, 180, radiusInKm);
    const [max_lat, ] = destinationPoint(lat, lng, 0, radiusInKm);
    const [, min_lng] = destinationPoint(lat, lng, 270, radiusInKm);
    const [, max_lng] = destinationPoint(lat, lng, 90, radiusInKm);
    if (min_lat <= userPos.lat && userPos.lat <= max_lat && min_lng <= userPos.lng && userPos.lng <= max_lng) {
        isClose = true;
    }

    L.marker([lat, lng], {icon: icon})
    .bindPopup(popupContent(poiName, estimation, approximation, isClose), {
        className: "popup"
    })
    .addTo(map);
}


function destinationPoint(lat, lng, brng, dist) {
    dist = dist / 6371;
    brng = brng * Math.PI / 180;
    
    let lat1 = lat * Math.PI / 180, lon1 = lng * Math.PI / 180;

    let lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) + 
                            Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));

    let lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
                                    Math.cos(lat1), 
                                    Math.cos(dist) - Math.sin(lat1) *
                                    Math.sin(lat2));

    if (isNaN(lat2) || isNaN(lon2)) return [null, null];

    return [lat2 * 180 / Math.PI, lon2 * 180 / Math.PI];
}


function clearMarkers() {
    map.closePopup()
    const markers = Array.from(document.getElementsByClassName("marker"));
    for (let marker of markers) {
        marker.remove();
    }
}

// Should place pins on 45deg and 225deg (the points with maximum lat-lng and minimum lat-lng respectively)
// The first argument is the response.info (the response of the api)
// The POIs I am interested in are inside the incircle of the rectangle defined by those two points.
function placeProofPins(info) {
    L.marker([info.min_lat, info.min_lng]).addTo(map);
    L.marker([info.max_lat, info.max_lng]).addTo(map);
}

// Functions that produce icons/popups

// Create a custom marker
const pegmanIcon = L.icon({
    iconUrl: '../../../resources/pegman.png',
    iconSize:     [20, 42],
    iconAnchor:   [10, 21],
    popupAnchor:  [10, 21]
});

const icon = (color) => {
    return L.divIcon({
        className: `marker marker-${color}`,
        iconAnchor: [0, 0],
        labelAnchor: [0, 0],
        popupAnchor: [0, 0]
    });
}
const redIcon = icon("red");
const orangecon = icon("orange");
const greenIcon = icon("green");

function getMarkerIcon(index, numOfPois) {
    const greenBound = 0.32*numOfPois;
    const orangeBound = 0.65*numOfPois;
    if (index <= greenBound) {
        return greenIcon;
    }
    if (index <= orangeBound) {
        return orangecon;
    }
    return redIcon;
}

const popupContent = (name, estimation, userApprox, isClose) => {
    let template = `
    <div class="popup-title">${name}</div>
    <ul class="popup-list">
        <li class="popup-item">Estimation for the next two hours: ${Math.round(estimation)}</li>
        <li class="popup-item">Live approximation from user input: ${Math.round(userApprox)}</li>
    </ul>
    `
    if (isClose) {
        template += `<a href="../register-location/reg-loc.php">Register your current location</a>`
    } 
    return template;
}