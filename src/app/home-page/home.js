const osmAttrib = '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';

var map = L.map('map').setView([51.505, -0.09], 13);

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
const tiles = L.tileLayer(tileUrl, {osmAttrib})

tiles.addTo(map);