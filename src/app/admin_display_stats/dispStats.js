if(!localStorage.getItem("token") && !sessionStorage.getItem("token")) {
    window.location.replace(`${window.location.origin}/src/app/login-page/login.php`);
}

// getStats();


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

const ctx = document.getElementById('per-day-chart').getContext('2d');
const myChart = new Chart(ctx, {
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
