const now = new Date();
const todayFormatted = formatDate(now);

// There is no point for someone to register positive after 14 days.
const minDate = new Date();
minDate.setDate(now.getDate() - 14);
const minDateFormatted = formatDate(minDate);

const datepicker = document.querySelector("#datepicker");
datepicker.value = todayFormatted;
// Impossible to know whether you will test positive tomorrow
datepicker.max = todayFormatted;
datepicker.min = minDateFormatted;


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