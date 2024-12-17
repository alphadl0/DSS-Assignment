// Fetch data from the backend and render charts
async function fetchDataAndRenderCharts() {
    try {
        const response = await fetch('http://localhost:3000/api/data');
        const data = await response.json();

        const years = data.map(item => item.Year);
        const revenue = data.map(item => item.Revenue);
        const costs = data.map(item => item.Costs);
        const productionTotal = data.map(item => item.Production_Total);
        const grossProfit = data.map(item => item.Gross_profit);
        const personnelExpenses = data.map(item => item.Personnel_expenses);

        // Sales Chart
        const salesChartCtx = document.getElementById('salesChart').getContext('2d');
        new Chart(salesChartCtx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [
                    { label: 'Revenue', data: revenue, backgroundColor: 'rgba(54, 162, 235, 0.6)' },
                    { label: 'Costs', data: costs, backgroundColor: 'rgba(255, 99, 132, 0.6)' }
                ]
            },
            options: { responsive: true }
        });

        // Production Chart
        const productionChartCtx = document.getElementById('productionChart').getContext('2d');
        new Chart(productionChartCtx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [
                    { label: 'Production Total', data: productionTotal, borderColor: 'rgba(75, 192, 192, 1)', fill: false }
                ]
            },
            options: { responsive: true }
        });

        // Expenses Chart
        const expensesChartCtx = document.getElementById('expensesChart').getContext('2d');
        new Chart(expensesChartCtx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [
                    { label: 'Gross Profit', data: grossProfit, backgroundColor: 'rgba(153, 102, 255, 0.6)' },
                    { label: 'Personnel Expenses', data: personnelExpenses, backgroundColor: 'rgba(255, 206, 86, 0.6)' }
                ]
            },
            options: { responsive: true }
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function
fetchDataAndRenderCharts();
