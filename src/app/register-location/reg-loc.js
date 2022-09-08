if(!localStorage.getItem("token") && !sessionStorage.getItem("token")) {
    window.location.replace(`${window.location.origin}/src/app/login-page/login.php`);
}


const params = Object.fromEntries(new URLSearchParams(location.search));
console.log(params);

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
console.log(dateTime);

async function onReport(event) {
    event.preventDefault();
    const response = await fetch(
        `http://localhost:8080/register-location/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify({
                time: dateTime,
                name: params.PoiName,
                address: params.PoiAddress,
                estimation: estimInput.value
            })
        }
    );
    const respJson = await response.json();

    cleanPrevMessage();
    const respDiv = document.createElement('div');
    respDiv.id = "regLoc-respMessage";
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