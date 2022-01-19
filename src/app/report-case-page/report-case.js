if(!localStorage.getItem("token") && !sessionStorage.getItem("token")) {
    window.location.replace(`${window.location.origin}/src/app/login-page/login.php`);
} 

const now = new Date();
const todayFormatted = formatDate(now);

// There is no point for someone to register positive after 14 days.
const minDate = new Date();
minDate.setDate(now.getDate() - 13);
const minDateFormatted = formatDate(minDate);

const datepicker = document.querySelector("#datepicker");
datepicker.value = todayFormatted;
// Impossible to know whether you will test positive tomorrow
datepicker.max = todayFormatted;
datepicker.min = minDateFormatted;

// Report form
const rcForm = document.querySelector(".rc-form");
rcForm.addEventListener("submit", (event) => {
    event.preventDefault();
});
const rcButton = document.querySelector("#rc-register");
rcButton.addEventListener("click", onReport);

async function onReport(event) {
    const response = await fetch(
        `http://localhost:8080/report-case/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify({
                dayReportedPositive: datepicker.value
            })
        }
    );
    const respJson = await response.json();

    cleanPrevMessage();
    const respDiv = document.createElement('div');
    respDiv.id = "rc-respMessage";
    if (respJson.wasRegistered){
        respDiv.classList = "text-danger";
        respDiv.textContent = `You have already registered positive for Covid-19 in the last 14 days!`;
    }
    else if (!respJson.success) {
        respDiv.classList = "text-danger";
        respDiv.textContent = `Invalid request!`;
    }
    else if (!respJson.wasRegistered && respJson.success){
        respDiv.classList = "highlight-primary";
        respDiv.textContent = "You registered successfully as a Covid-19 case!";
    }
    rcForm.appendChild(respDiv);
}


// Utility functions
function getTwoDigitString(value) {
    let str = value.toString();
    if (str.length == 1) {
        str = '0' + str;
    }
    return str;
}

function formatDate(date) {
    return `${date.getFullYear()}-${getTwoDigitString(date.getMonth()+1)}-${getTwoDigitString(date.getDate())}`;
}


function cleanPrevMessage() {
    const el = document.querySelector('#rc-respMessage');
    if(el) el.remove();
}