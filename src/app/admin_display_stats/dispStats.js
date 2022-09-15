import { safe_fetch, redirectIfTokenMissing } from "../auth_helper.js"


redirectIfTokenMissing();

/* Fetch data for stats-numbers section */


/* Fetch data for ds-table-section section */


/* Fetch data for stats-diagrams section */
// Data variables. If their value is not null then
// unchecking and rechecking one of the checkboxes will not fetch new data
// but will hide and unhide respectively the data from the graphs
// Only the refresh button should fetch new data - clearing all existing
let dayVisitData;
let dayCovidVisitData;
let hourVisitData;
let hourCovidVisitData;

// Make sure the user has filled the form before refreshing
const fetchDay = document.getElementById('refresh-day');
fetchDay.addEventListener("click", refreshDayGraph);

const fetchHour = document.getElementById('refresh-hour');
fetchHour.addEventListener("click", refreshHourGraph);

function refreshDayGraph(event) {
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

    perDayChartGroup.hidden = false;
    // TODO: fetch requests
    if(checkDayVisits.checked) {
        
    }
    if(checkDayCovidVisits.checked) {

    }
}

function refreshHourGraph(event) {
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

    perHourChartGroup.hidden = false;
    // TODO: fetch requests
    if(checkHourVisits.checked) {
        
    }
    if(checkHourCovidVisits.checked) {

    }
}

// Checking a checkbox that has no data do display should fetch the data
// If dates are not specified return and let their listeners handle fetch
const checkDayVisits = document.getElementById('check-per-day-visits');
checkDayVisits.addEventListener("change", event => {
    if(!startDate.value || !endDate.value) return;
    if (event.target.checked) {
        if(!dayVisitData) {
            // TODO: fetch data
        }
        perDayChartGroup.hidden = false;
    }
    else {
        // TODO: Hide day visits data
        if (!checkDayCovidVisits.checked) {
            perDayChartGroup.hidden = true;
        }
    }
});
const checkDayCovidVisits = document.getElementById('check-per-day-covid-visits');
checkDayCovidVisits.addEventListener("change", event => {
    if(!startDate.value || !endDate.value) return;
    if (event.target.checked) {
        if(!dayCovidVisitData) {
            // TODO: fetch data and display them
        }
        perDayChartGroup.hidden = false;
    }
    else {
        // TODO: Hide day covid visits data
        if (!checkDayVisits.checked) {
            perDayChartGroup.hidden = true;
        }
    }
});

const checkHourVisits = document.getElementById('check-per-hour-visits');
checkHourVisits.addEventListener("change", event => {
    if(!hourDate.value) return;
    if(event.target.checked) {
        if(!hourVisitData) {
            // TODO: fetch data and display them
        }
        perHourChartGroup.hidden = false;
    }
    else {
        // TODO: Hide hourly visits data
        if (!checkHourCovidVisits.checked) {
            perHourChartGroup.hidden = true;
        }
    }
});
const checkHourCovidVisits = document.getElementById('check-per-hour-covid-visits');
checkHourCovidVisits.addEventListener("change", event => {
    if(!hourDate.value) return;
    if(event.target.checked) {
        if(!hourCovidVisitData) {
            // TODO: fetch data and display them
        }
        perHourChartGroup.hidden = false;
    }
    else {
        // TODO: Hide hourly covid visits data
        if (!checkHourVisits.checked) {
            perHourChartGroup.hidden = true;
        }
    }
});

// Setting a value for a datepicker should check if a checkbox is already checked
// and in the case of per-day diagram check whether the other date is undefined 
// If no checkboxes are checked return and let their listeners handle fetch
let startDate = document.getElementById("startdate-day");
startDate.addEventListener("change", event => {
    if(!endDate.value || (!checkDayVisits.checked && !checkDayCovidVisits.checked)) return;
    perDayChartGroup.hidden = false;
    // TODO: Fetch data
});
let endDate = document.getElementById("enddate-day");
endDate.addEventListener("change", event => {
    if(!startDate.value || (!checkDayVisits.checked && !checkDayCovidVisits.checked)) return;
    perDayChartGroup.hidden = false;
    // TODO: Fetch data
});
let hourDate = document.getElementById("hour-datepicker");
hourDate.addEventListener("change", event => {
    if(!checkHourVisits.checked && !checkHourCovidVisits.checked) return;
    perHourChartGroup.hidden = false;
    // TODO: Fetch data
});

// Charts
const perDayChartGroup = document.getElementById("per-day-chart-group");
const perHourChartGroup = document.getElementById("per-hour-chart-group");

const perDayContext = document.getElementById('per-day-chart').getContext('2d');
const perHourContext = document.getElementById('per-hour-chart').getContext('2d');

const perDayChart = new Chart(perDayContext, {
    type: 'bar'
});

const perHourChart = new Chart(perDayContext, {
    type: 'bar'
});
