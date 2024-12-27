let chart; // Main chart
let revenueCostsChart; // Revenue-Costs chart

// Function to fetch and display charts
function fetchDataAndDisplayChart(type, label, unit) {
  fetch(`/getData/${type}`)
    .then((response) => response.json())
    .then((data) => {
      const labels = data.map((item) => item.year);
      const values = data.map((item) => item.value);

      const ctx = document.getElementById("chartCanvas").getContext("2d");
      if (chart) chart.destroy();

      chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: `${label} (${unit})`,
              data: values,
              backgroundColor: labels.map(() => getRandomColor()),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allows height/width customization
          plugins: {
            legend: { display: true, position: "bottom" },
            title: { display: true, text: label },
          },
          scales: { y: { beginAtZero: true } },
        },
      });
    })
    .catch((err) => console.error(`Error fetching data: ${err.message}`));
}

// Function for Revenue and Costs Chart
function fetchRevenueAndCosts() {
  fetch("/getData/revenueCosts")
    .then((response) => response.json())
    .then((data) => {
      const labels = data.map((item) => item.year);
      const revenue = data.map((item) => item.revenue);
      const costs = data.map((item) => item.costs);

      const ctx = document
        .getElementById("revenueCostsCanvas")
        .getContext("2d");
      if (revenueCostsChart) revenueCostsChart.destroy();

      revenueCostsChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Gelir (Milyon Euro)", // Revenue
              data: revenue,
              borderColor: "rgb(2, 106, 35)",
              backgroundColor: "rgba(45, 45, 45, 0.2)",
              borderWidth: 2,
              fill: true,
              tension: 0.4, // Smooth curve
            },
            {
              label: "Maliyetler (Milyon Euro)", // Costs
              data: costs,
              borderColor: "rgb(206, 55, 5)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderWidth: 2,
              fill: true,
              tension: 0.4, // Smooth curve
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allows height/width customization
          plugins: {
            legend: {
              display: true,
              position: "bottom", // Legend at the bottom
            },
            title: {
              display: true,
              text: "Yıllık Gelir ve Maliyetler",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Milyon Euro", // Y-axis label
              },
            },
            x: {
              title: {
                display: true,
                text: "Yıllar", // X-axis label
              },
            },
          },
        },
      });
    })
    .catch((err) =>
      console.error(`Error fetching revenue/costs data: ${err.message}`)
    );
}

// Function for Expenses Chart
function fetchExpenses() {
  fetch("/getData/expenses")
    .then((response) => response.json())
    .then((data) => {
      const labels = data.map((item) => item.year);
      const grossProfit = data.map((item) => item.gross_profit);
      const personnelExpenses = data.map((item) => item.personnel_expenses);

      const ctx = document.getElementById("chartCanvas").getContext("2d");
      if (chart) chart.destroy();

      chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Brüt Kâr (Milyon Euro)",
              data: grossProfit,
              backgroundColor: "rgba(153, 102, 255, 0.6)",
            },
            {
              label: "Personel Giderleri (Milyon Euro)",
              data: personnelExpenses,
              backgroundColor: "rgba(255, 206, 86, 0.6)",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allows height/width customization
          plugins: {
            legend: { display: true, position: "bottom" },
            title: {
              display: true,
              text: "Yıllık Brüt Kâr ve Personel Giderleri",
            },
          },
          scales: { y: { beginAtZero: true } },
        },
      });
    })
    .catch((err) =>
      console.error(`Error fetching expenses data: ${err.message}`)
    );
}

// Generate random colors for bars
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 0.7)`;
}

// Automatically load "Giderler" and "Gelir ve Maliyetler" charts on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchExpenses(); // Automatically fetch and display the Expenses chart
  fetchRevenueAndCosts(); // Automatically fetch and display the Revenue and Costs chart
});

// Event Listeners for other charts
document.getElementById("btnSales").addEventListener("click", () => {
  fetchDataAndDisplayChart("salesamount", "Toplam satışlar", "Binlerce");
});
document.getElementById("btnSalesGermany").addEventListener("click", () => {
  fetchDataAndDisplayChart("sales_germany", "Almanya Satış", "Binlerce");
});
document.getElementById("btnSalesAbroad").addEventListener("click", () => {
  fetchDataAndDisplayChart("sales_abroad", "Yurtdışı Satış", "Binlerce");
});
document.getElementById("btnProduction").addEventListener("click", () => {
  fetchDataAndDisplayChart("production_total", "Üretim toplamı", "Binlerce");
});
document
  .getElementById("btnProductionGermany")
  .addEventListener("click", () => {
    fetchDataAndDisplayChart(
      "production_germany",
      "Üretim Almanya",
      "Binlerce"
    );
  });
document.getElementById("btnProductionAbroad").addEventListener("click", () => {
  fetchDataAndDisplayChart(
    "production_abroad",
    "Yurtdışında Üretim",
    "Binlerce"
  );
});
document.getElementById("btnExpenses").addEventListener("click", fetchExpenses);
document
  .getElementById("btnRevenueCosts")
  .addEventListener("click", fetchRevenueAndCosts);
