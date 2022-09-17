const apiAddress = "http://localhost:8080/";

export let dispStats = () => {
    return new Request(`http://localhost:8080/disp-stats`,
    {
        headers: {
            'Authorization': localStorage.getItem("token") || sessionStorage.getItem("token")
        }
    }
    );
}

export let visitDayRequest = (startDate, endDate) => {
    return new Request(apiAddress + "visits-per-day/", 
    {
        method: "POST",
        headers: {
            'Authorization': localStorage.getItem("token") || sessionStorage.getItem("token"),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstDate: startDate,
            endDate: endDate
        })
    });
}

export let visitCovidDayRequest = (startDate, endDate) => {
    return new Request(apiAddress + "covid-visits-per-day/", 
    {
        method: "POST",
        headers: {
            'Authorization': localStorage.getItem("token") || sessionStorage.getItem("token"),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstDate: startDate,
            endDate: endDate
        })
    });
}

export let visitHourRequest = (date) => {
    return new Request(apiAddress + "visits-per-hour/", 
    {
        method: "POST",
        headers: {
            'Authorization': localStorage.getItem("token") || sessionStorage.getItem("token"),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Date: date
        })
    });
}

export let visitCovidHourRequest = (date) => {
    return new Request(apiAddress + "covid-visits-per-hour/", {
        method: "POST",
        headers: {
            'Authorization': localStorage.getItem("token") || sessionStorage.getItem("token"),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Date: date
        })
    });
}