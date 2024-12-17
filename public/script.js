let chart; // Main chart
let revenueCostsChart; // Revenue-Costs chart

// Function to fetch and display charts
function fetchDataAndDisplayChart(type, label, unit) {
    fetch(`/getData/${type}`)
        .then(response => response.json())
        .then(data => {
            const labels = data.map(item => item.year);
            const values = data.map(item => item.value);

            const ctx = document.getElementById('chartCanvas').getContext('2d');
            if (chart) chart.destroy();

            chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: `${label} (${unit})`,
                        data: values,
                        backgroundColor: labels.map(() => getRandomColor()),
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: true, position: 'bottom' },
                        title: { display: true, text: label }
                    },
                    scales: { y: { beginAtZero: true } }
                }
            });
        })
        .catch(err => console.error(`Error fetching data: ${err.message}`));
}

// Function for Revenue and Costs Chart
function fetchRevenueAndCosts() {
    fetch('/getData/revenueCosts')
        .then(response => response.json())
        .then(data => {
            const labels = data.map(item => item.year);
            const revenue = data.map(item => item.revenue);
            const costs = data.map(item => item.costs);

            const ctx = document.getElementById('revenueCostsCanvas').getContext('2d');
            if (revenueCostsChart) revenueCostsChart.destroy();

            revenueCostsChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Revenue (Million Euros)',
                            data: revenue,
                            backgroundColor: 'rgba(75, 192, 192, 0.7)',
                        },
                        {
                            label: 'Costs (Million Euros)',
                            data: costs,
                            backgroundColor: 'rgba(255, 99, 132, 0.7)',
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: true, position: 'bottom' },
                        title: { display: true, text: 'Revenue and Costs per Year' }
                    },
                    scales: { y: { beginAtZero: true } }
                }
            });
        })
        .catch(err => console.error(`Error fetching revenue/costs data: ${err.message}`));
}

// Generate random colors for bars
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.7)`;
}

// Event Listeners
document.getElementById('btnSales').addEventListener('click', () => {
    fetchDataAndDisplayChart('salesamount', 'Sales Data', 'Million Euros');
});
document.getElementById('btnSalesGermany').addEventListener('click', () => {
    fetchDataAndDisplayChart('sales_germany', 'Sales Germany', 'Thousands');
});
document.getElementById('btnSalesAbroad').addEventListener('click', () => {
    fetchDataAndDisplayChart('sales_abroad', 'Sales Abroad', 'Thousands');
});
document.getElementById('btnProduction').addEventListener('click', () => {
    fetchDataAndDisplayChart('production_total', 'Production Data', 'Thousands');
});
document.getElementById('btnProductionGermany').addEventListener('click', () => {
    fetchDataAndDisplayChart('production_germany', 'Production Germany', 'Thousands');
});
document.getElementById('btnProductionAbroad').addEventListener('click', () => {
    fetchDataAndDisplayChart('production_abroad', 'Production Abroad', 'Thousands');
});
document.getElementById('btnRevenueCosts').addEventListener('click', fetchRevenueAndCosts);
