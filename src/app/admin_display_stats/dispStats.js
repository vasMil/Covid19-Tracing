import { safe_fetch, redirectIfTokenMissing } from "../auth_helper.js"
import { dispStats, visitDayRequest, visitCovidDayRequest, visitHourRequest, visitCovidHourRequest } from "./requests.js"

redirectIfTokenMissing();

const fetch_req = fetch(dispStats());

let {respJson: staticStats} = await safe_fetch(fetch_req);
/* Set data for stats-numbers section */
document.getElementById("loc-regs").textContent = staticStats.totalVisits;
document.getElementById("cases-regs").textContent = staticStats.totalCovidCases;
document.getElementById("patient-visits").textContent = staticStats.totalVisitsFromCases;

/* Set data for ds-table-section section */
let tableData = staticStats.tableData;

function render_table() {
    let tableBody = document.getElementById("ds-table-body");
    // Empty the table of the old children (if any)
    while (tableBody.lastChild) {
        tableBody.removeChild(tableBody.lastChild);
    }
    // Insert the new rows
    let i = 1;
    for (let poiType of tableData) {
        tableBody.appendChild(tableRowFactory(i++, poiType));
    }
}
render_table();

// Add table event listener
let amountVisits = document.getElementById("amount-visits-col");
let amountCovidVisits = document.getElementById("amount-covid-visits-col");
const spanSortIcon = document.getElementById("sort-col-span");

amountVisits.addEventListener("click", event => {
    if (amountVisits.className == "sort-col") return;
    // Configure the header
    amountCovidVisits.className = "";
    amountCovidVisits.removeChild(spanSortIcon);
    amountVisits.appendChild(spanSortIcon);
    amountVisits.className = "sort-col";

    // Rerender the table
    tableData.sort((a, b) => {
        return b.amountOfVisits - a.amountOfVisits
    });
    render_table();
});
amountCovidVisits.addEventListener("click", event => {
    if (amountCovidVisits.className == "sort-col") return;
    // Configure the header
    amountVisits.className = "";
    amountVisits.removeChild(spanSortIcon);
    amountCovidVisits.appendChild(spanSortIcon);
    amountCovidVisits.className = "sort-col";

    // Rerender the table
    tableData.sort((a, b) => {
        return b.amountOfCovidVisits - a.amountOfCovidVisits
    });
    render_table();
});

function tableRowFactory(i, poiType) {
    let el_tr = document.createElement("tr");
    el_tr.innerHTML = `
        <td>${i}</td>
        <td>${poiType.typeOfPOI}</td>
        <td>${poiType.amountOfVisits}</td>
        <td>${poiType.amountOfCovidVisits}</td>`;
    return el_tr;
}

/* Fetch data for stats-diagrams section */
// Select datepickers
const startDatepicker = document.getElementById("startdate-day");
const endDatepicker = document.getElementById("enddate-day");
const hourDatepicker = document.getElementById("hour-datepicker");

// Configure the End date datepicker to either a weekpicker or to a monthpicker
const endDateLabel = document.getElementById("end-date-label");
endDateLabel.addEventListener("click", () => {
    if (endDateLabel.classList.contains("weekpicker")) {
        endDateLabel.classList.replace("weekpicker", "monthpicker");
    }
    else {
        endDateLabel.classList.replace("monthpicker", "weekpicker");
    }
    endDatepicker.dispatchEvent(new Event("change"));
    fixDates();
});

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

async function refreshDayGraph(event) {
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
    if(checkDayVisits.checked) {
        dayVisitData = (await safe_fetch(fetch(visitDayRequest(startDatepicker.value, endDatepicker.value)))).respJson.visits;
        drawPerDayChart(dayVisitData, "visits");
    }
    if(checkDayCovidVisits.checked) {
        dayCovidVisitData = (await safe_fetch(fetch(visitCovidDayRequest(startDatepicker.value, endDatepicker.value)))).respJson.covidVisits;
        drawPerDayChart(dayCovidVisitData, "covid-visits");
    }
}

async function refreshHourGraph(event) {
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
    if(checkHourVisits.checked) {
        hourVisitData = (await safe_fetch(fetch(visitHourRequest(hourDatepicker.value)))).respJson.visits;
        drawPerHourChart(hourVisitData, "visits");
    }
    if(checkHourCovidVisits.checked) {
        hourCovidVisitData = (await safe_fetch(fetch(visitCovidHourRequest(hourDatepicker.value)))).respJson.covidVisits;
        drawPerHourChart(hourCovidVisitData, "covid-visits");
    }
}

// Checking a checkbox that has no data do display should fetch the data
// If dates are not specified return and let their listeners handle fetch
const checkDayVisits = document.getElementById('check-per-day-visits');
checkDayVisits.addEventListener("change", async event => {
    if(!startDate.value || !endDate.value) return;
    if (event.target.checked) {
        if(!dayVisitData) {
            dayVisitData = (await safe_fetch(fetch(visitDayRequest(startDatepicker.value, endDatepicker.value)))).respJson.visits;
        }
        perDayChartGroup.hidden = false;
        drawPerDayChart(dayVisitData, "visits");
    }
    else {
        removeFromChart(perDayChart, "visits");
        if (!checkDayCovidVisits.checked) {
            perDayChartGroup.hidden = true;
        }
    }
});
const checkDayCovidVisits = document.getElementById('check-per-day-covid-visits');
checkDayCovidVisits.addEventListener("change", async event => {
    if(!startDate.value || !endDate.value) return;
    if (event.target.checked) {
        if(!dayCovidVisitData) {
            dayCovidVisitData = (await safe_fetch(fetch(visitCovidDayRequest(startDatepicker.value, endDatepicker.value)))).respJson.covidVisits;
        }
        perDayChartGroup.hidden = false;
        drawPerDayChart(dayCovidVisitData, "covid-visits");
    }
    else {
        removeFromChart(perDayChart, "covid-visits");
        if (!checkDayVisits.checked) {
            perDayChartGroup.hidden = true;
        }
    }
});

const checkHourVisits = document.getElementById('check-per-hour-visits');
checkHourVisits.addEventListener("change", async event => {
    if(!hourDate.value) return;
    if(event.target.checked) {
        if(!hourVisitData) {
            hourVisitData = (await safe_fetch(fetch(visitHourRequest(hourDatepicker.value)))).respJson.visits;
        }
        perHourChartGroup.hidden = false;
        drawPerHourChart(hourVisitData, "visits");
    }
    else {
        removeFromChart(perHourChart, "visits");
        if (!checkHourCovidVisits.checked) {
            perHourChartGroup.hidden = true;
        }
    }
});
const checkHourCovidVisits = document.getElementById('check-per-hour-covid-visits');
checkHourCovidVisits.addEventListener("change", async event => {
    if(!hourDate.value) return;
    if(event.target.checked) {
        if(!hourCovidVisitData) {
            hourCovidVisitData = (await safe_fetch(fetch(visitCovidHourRequest(hourDatepicker.value)))).respJson.covidVisits;
        }
        perHourChartGroup.hidden = false;
        drawPerHourChart(hourCovidVisitData, "covid-visits");
    }
    else {
        removeFromChart(perHourChart, "covid-visits");
        if (!checkHourVisits.checked) {
            perHourChartGroup.hidden = true;
        }
    }
});

// Setting a value for a datepicker should check if a checkbox is already checked
// and in the case of per-day diagram check whether the other date is undefined 
// If no checkboxes are checked return and let their listeners handle fetch
let startDate = document.getElementById("startdate-day");
startDate.addEventListener("change", async () => {
    fixDates();
    if(!endDate.value || (!checkDayVisits.checked && !checkDayCovidVisits.checked)) return;
    perDayChartGroup.hidden = false;
    if(checkDayVisits.checked) {
        dayVisitData = (await safe_fetch(fetch(visitDayRequest(startDatepicker.value, endDatepicker.value)))).respJson.visits;
        drawPerDayChart(dayVisitData, "visits");
    }
    if(checkDayCovidVisits.checked) {
        dayCovidVisitData = (await safe_fetch(fetch(visitCovidDayRequest(startDatepicker.value, endDatepicker.value)))).respJson.covidVisits;
        drawPerDayChart(dayCovidVisitData, "covid-visits");
    }
});
let endDate = document.getElementById("enddate-day");
endDate.addEventListener("change", async () => {
    if(!startDate.value || (!checkDayVisits.checked && !checkDayCovidVisits.checked)) return;
    perDayChartGroup.hidden = false;
    if(checkDayVisits.checked) {
        dayVisitData = (await safe_fetch(fetch(visitDayRequest(startDatepicker.value, endDatepicker.value)))).respJson.visits;
        drawPerDayChart(dayVisitData, "visits");
    }
    if(checkDayCovidVisits.checked) {
        dayCovidVisitData = (await safe_fetch(fetch(visitCovidDayRequest(startDatepicker.value, endDatepicker.value)))).respJson.covidVisits;
        drawPerDayChart(dayCovidVisitData, "covid-visits");
    }
});
let hourDate = document.getElementById("hour-datepicker");
hourDate.addEventListener("change", async () => {
    if(!checkHourVisits.checked && !checkHourCovidVisits.checked) return;
    perHourChartGroup.hidden = false;
    if(checkHourVisits.checked) {
        hourVisitData = (await safe_fetch(fetch(visitHourRequest(hourDatepicker.value)))).respJson.visits;
        drawPerHourChart(hourVisitData, "visits");
    }
    if(checkHourCovidVisits.checked) {
        hourCovidVisitData = (await safe_fetch(fetch(visitCovidHourRequest(hourDatepicker.value)))).respJson.covidVisits;
        drawPerHourChart(hourCovidVisitData, "covid-visits");
    }
});

// Charts
const perDayChartGroup = document.getElementById("per-day-chart-group");
const perHourChartGroup = document.getElementById("per-hour-chart-group");

const perDayContext = document.getElementById('per-day-chart').getContext('2d');
const perHourContext = document.getElementById('per-hour-chart').getContext('2d');

const perDayChart = new Chart(perDayContext, {
    type: 'bar',
    data: {
        datasets: [
            {
                label: "visits",
                backgroundColor: 'rgb(218, 183, 247)',
                data: fillEmptyDays(dayVisitData)
            },
            {
                label: "covid-visits",
                backgroundColor: 'rgb(165, 250, 223)',
                data: fillEmptyDays(dayCovidVisitData)
            }
        ]
    }
});
const perHourChart = new Chart(perHourContext, {
    type: 'bar',
    data: {
        labels: getHours(),
        datasets: [
            {
                label: "visits",
                backgroundColor: 'rgb(218, 183, 247)'
            },
            {
                label: "covid-visits",
                backgroundColor: 'rgb(165, 250, 223)'
            }
        ]
    }
});

function drawPerDayChart(visitData, datasetLabel) {
    // Update the labels
    perDayChart.data.labels = getDates(startDatepicker.value, endDatepicker.value);
    perDayChart.data.datasets.forEach((dataset) => {
        if(dataset.label === datasetLabel) {
            dataset.data = fillEmptyDays(visitData);
        }
    });
    perDayChart.update();
}

function drawPerHourChart(visitData, datasetLabel) {
    perHourChart.data.datasets.forEach((dataset) => {
        if(dataset.label === datasetLabel) {
            dataset.data = fillEmptyHours(visitData);
        }
    });
    perHourChart.update();
}

function removeFromChart(chart, datasetLabel) {
    chart.data.datasets.forEach((dataset) => {
        if(dataset.label === datasetLabel) {
            dataset.data = [];
        }
    });
    chart.update();
}

/* UTILS */
function formatDate(date) {
    let fdate = date.toLocaleDateString("gr-EL", { year: 'numeric', month: '2-digit', day: '2-digit' });
    fdate = fdate.split('/').reverse().join('-');
    return fdate;
}

function fixDates() {
    let dateParts = startDatepicker.value.split('-');
    let startDate = new Date(dateParts[0], dateParts[1]-1, dateParts[2]);
    let endDate;
    if(endDateLabel.classList.contains("weekpicker")) {
        startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - startDate.getDay());
        endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+6);
    }
    else if (endDateLabel.classList.contains("monthpicker")) {
        startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        endDate = new Date(startDate.getFullYear(), startDate.getMonth()+1, 0);
    }
    else {
        // Something broke
        location.reload();
        return;
    }
    startDatepicker.value = formatDate(startDate);
    endDatepicker.value = formatDate(endDate);
}

function getDates(startDate, stopDate) {
    startDate = startDate.split('-');
    stopDate = stopDate.split('-');
    stopDate = new Date(stopDate[0], stopDate[1]-1, stopDate[2]);
    let dateArray = new Array();
    let currentDate = new Date(startDate[0], startDate[1]-1, startDate[2]);
    while (currentDate <= stopDate) {
        dateArray.push(formatDate(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
}

function fillEmptyDays(visits) {
    let days = getDates(startDatepicker.value, endDatepicker.value);
    let filledVisits;
    let i = 0;
    if(!visits) {
        filledVisits = new Array(days.length);
        return filledVisits.fill(0);
    }
    filledVisits = new Array();
    // TODO: Write an assert to check if both arrays are in asc order
    for (let day of days) {
        if (i < visits.length) {
            filledVisits.push(visits[i].day == day ? visits[i++].numOfVisits : 0);
        }
        else {
            filledVisits.push(0);
        }
    }
    return filledVisits;
}

function formatHour(hour_int) {
    hour_int = hour_int.toString();
    while (hour_int.length < 2) hour_int = "0" + hour_int;
    hour_int = hour_int + ':' + "00"
    return hour_int;
}

function getHours() {
    let hourArray = new Array();
    for(let i = 0; i < 24; i++) {
        hourArray.push(formatHour(i));
    }
    return hourArray;
}

function fillEmptyHours(visits) {
    let hours = getHours();
    let filledVisits;
    let i = 0;
    if(!visits) {
        filledVisits = new Array(hours.length);
        return filledVisits.fill(0);
    }
    filledVisits = new Array();
    // TODO: Write an assert to check if both arrays are in asc order
    for (let hour of hours) {
        if (i < visits.length) {
            if (visits[i].hour == hour) {
                filledVisits.push(visits[i].numOfVisits);
                i++;
            }
            else {
                filledVisits.push(0);
            }
            
        }
        else {
            filledVisits.push(0);
        }
    }
    return filledVisits;
}
