import {redirectIfTokenMissing, safe_fetch} from "../auth_helper.js";

redirectIfTokenMissing();

const params = Object.fromEntries(new URLSearchParams(location.search));

document.getElementById("name").value = params.PoiName;
document.getElementById("address").value = params.PoiAddress;

const regLocForm = document.querySelector(".reg-loc");
const estimInput = document.querySelector("#estim");

const regLocButton = document.querySelector("#submitButton");
regLocButton.addEventListener("click", onReport);

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
//console.log(dateTime);

async function onReport(event) {
    event.preventDefault();
    cleanPrevMessage();

    const respDiv = document.createElement('div');
    respDiv.id = "regLoc-respMessage";

    // Check if estimation has a valid value
    if(!estimInput.value) {
        respDiv.classList = "text-danger";
        respDiv.textContent = `The estimation field is required!`;
        regLocForm.appendChild(respDiv);
        return;
    }
    else if(estimInput.value < 0) {
        respDiv.classList = "text-danger";
        respDiv.textContent = `The estimation field should be a non negative value!`;
        regLocForm.appendChild(respDiv);
        return;
    }
    const fetch_req = fetch(
        `http://localhost:8080/register-location/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token") || sessionStorage.getItem("token")
            },
            body: JSON.stringify({
                time: dateTime,
                name: params.PoiName,
                address: params.PoiAddress,
                estimation: estimInput.value
            })
        }
    );
    const {respJson} = await safe_fetch(fetch_req);

    if (respJson.IsRegistered && !respJson.success){
        respDiv.classList = "text-danger";
        respDiv.textContent = `You have already registered your visit in this POI!`;
    }
    else if (!respJson.IsRegistered && respJson.success) {
        respDiv.classList = "highlight-primary";
        respDiv.textContent = `You registered successfully your visit!`;
    }
    
    regLocForm.appendChild(respDiv);
}

//Utility functions
function cleanPrevMessage() {
    const el = document.querySelector('#regLoc-respMessage');
    if(el) el.remove();
}

// Map
const lat = parseFloat(params.lat);
const lng = parseFloat(params.lng);

const map = L.map('map').setView([lat, lng], 16);
console.log(parseInt(params.lat), parseInt(params.lng))
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const marker = L.marker([lat, lng]).addTo(map);