import { safe_fetch, redirectIfTokenMissing } from "../auth_helper.js"


redirectIfTokenMissing();

/* Fetch data for stats-numbers section */


/* Fetch data for ds-table-section section */


/* Fetch data for stats-diagrams section */
// Data variables. If their value is not null then
// unchecking and rechecking one of the checkboxes will not fetch new data
// but will hide and unhide respectively the data from the graphs
// Only the fetch button should fetch new data - clearing all existing
let dayVisitData;
let dayCovidVisitData;
let hourVisitData;
let hourCovidVisitData;

// Make sure the user has filled the form before making the request
const fetchDay = document.getElementById('fetch-day');
fetchDay.addEventListener("click", displayDayGraph);

const fetchHour = document.getElementById('fetch-hour');
fetchHour.addEventListener("click", displayHourGraph);

const checkDayVisits = document.getElementById('check-per-day-visits');
checkDayVisits.addEventListener("change", event => {
    if(!dayVisitData && event.target.checked) {
        // TODO: fetch data and display them
    }
    else if(dayVisitData && event.target.checked) {
        // TODO: Show data
    }
    else {
        if (dayCovidVisitData && !checkDayCovidVisits.checked || !dayCovidVisitData) {
            // Hide canvas
        }
        else {
            // TODO: Hide day visits data
        }
    }
});
const checkDayCovidVisits = document.getElementById('check-per-day-covid-visits');
checkDayCovidVisits.addEventListener("change", event => {
    if(!dayCovidVisitData && event.target.checked) {
        // TODO: fetch data and display them
    }
    else if(dayCovidVisitData && event.target.checked) {
        // TODO: Show data
    }
    else {
        if (dayVisitData && !checkDayVisits.checked || !dayVisitData) {
            // Hide canvas
        }
        else {
            // TODO: Hide day covid visits data
        }
    }
});

const checkHourVisits = document.getElementById('check-per-hour-visits');
checkHourVisits.addEventListener("change", event => {
    if(!hourVisitData && event.target.checked) {
        // TODO: fetch data and display them
    }
    else if(hourVisitData && event.target.checked) {
        // TODO: Show data
    }
    else {
        if (hourCovidVisitData && !checkHourCovidVisits.checked || !hourCovidVisitData) {
            // Hide canvas
        }
        else {
            // TODO: Hide hourly visits data
        }
    }
});
const checkHourCovidVisits = document.getElementById('check-per-hour-covid-visits');
checkHourCovidVisits.addEventListener("change", event => {
    if(!hourCovidVisitData && event.target.checked) {
        // TODO: fetch data and display them
    }
    else if(hourCovidVisitData && event.target.checked) {
        // TODO: Show data
    }
    else {
        if (hourVisitData && !checkHourVisits.checked || !hourVisitData) {
            // Hide canvas
        }
        else {
            // TODO: Hide hourly covid visits data
        }
    }
});

function displayDayGraph(event) {
    let errorMessage = "Fields missing: ";
    if (!document.getElementById("startdate-day").value) {
        errorMessage += "\n- Starting Date";
    }
    if (!document.getElementById("enddate-day").value) {
        errorMessage += "\n- Ending Date";
    }
    if(!document.getElementById("check-per-day-visits").checked && 
        !document.getElementById("check-per-day-covid-visits").checked
    ) {
        errorMessage += "\n- At least one per-day checkbox needs to be checked";
    }
    if (errorMessage != "Fields missing: ") {
        alert(errorMessage);
        return;
    }

    // Delete existing data
    dayVisitData = null;
    dayCovidVisitData = null;

    // TODO: fetch requests
    if(document.getElementById("check-per-day-visits").checked) {
        
    }
    if(document.getElementById("check-per-day-covid-visits").checked) {

    }
}

function displayHourGraph(event) {
    let errorMessage = "Fields missing: ";
    if (!document.getElementById("hour-datepicker").value) {
        errorMessage += "\n- Date";
    }
    if(!document.getElementById("check-per-hour-visits").checked && 
        !document.getElementById("check-per-hour-covid-visits").checked
    ) {
        errorMessage += "\n- At least one per-hour checkbox needs to be checked";
    }
    if (errorMessage != "Fields missing: ") {
        alert(errorMessage);
        return;
    }

    // Delete existing data
    hourVisitData = null;
    hourCovidVisitData = null;

    // TODO: fetch requests
    if(document.getElementById("check-per-hour-visits").checked) {
        
    }
    if(document.getElementById("check-per-hour-covid-visits").checked) {

    }
}



const perDayContext = document.getElementById('per-day-chart').getContext('2d');
const perHourContext = document.getElementById('per-hour-chart').getContext('2d');

const perDayChart = new Chart(perDayContext, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
