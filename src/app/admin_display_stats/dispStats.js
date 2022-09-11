if(!localStorage.getItem("token") && !sessionStorage.getItem("token")) {
    window.location.replace(`${window.location.origin}/src/app/login-page/login.php`);
}

getStats();


async function getStats(){
    const response = await fetch(
    `http://localhost:8080/disp-stats-a-c`,
    {
        headers: {
            'Authorization': localStorage.getItem("token") || sessionStorage.getItem("token")
        }
    });
    const respJson = await response.json();

    document.getElementById("loc-regs").value = respJson.totalVisits;
    document.getElementById("cases-regs").value = respJson.totalCovidCases;
    document.getElementById("patient-visits").value = respJson.totalVisitsFromCases;
}


