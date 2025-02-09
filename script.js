document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");
    const loginModal = document.getElementById("login-modal");
    const closeLogin = document.getElementById("close-login");
    const loginForm = document.getElementById("login-form");
    const chartsSection = document.getElementById("charts-section");
    const filter = document.getElementById("filter");
    const barChartCanvas = document.getElementById("barChart");
    const lineChartCanvas = document.getElementById("lineChart");

    // Age Selector Update Code
    const ageInput = document.getElementById("age");
    const ageValue = document.getElementById("age-value");

    ageInput.addEventListener("input", () => {
        ageValue.textContent = ageInput.value + " years"; // Update the displayed age
    });

    const logoutBtn = document.createElement("button");
    logoutBtn.id = "logout-btn";
    logoutBtn.textContent = "Logout";
    logoutBtn.style.display = "none";
    document.querySelector(".auth-buttons").appendChild(logoutBtn);

    const darkModeBtn = document.createElement("button");
    darkModeBtn.id = "dark-mode-toggle";
    darkModeBtn.textContent = "Toggle Dark Mode";
    document.querySelector(".auth-buttons").appendChild(darkModeBtn);

    function toggleDarkMode() {
        if (document.body.classList.contains("dark-mode")) {
            document.body.classList.remove("dark-mode");
            
        } else {
            document.body.classList.add("dark-mode");
            
        }
    }
    darkModeBtn.addEventListener("click", toggleDarkMode);

    function toggleModal(modal, show) {
        if (show) {
            modal.style.display = "block";
        } else {
            modal.style.display = "none";
        }
    }

    loginBtn.addEventListener("click", () => toggleModal(loginModal, true));
    closeLogin.addEventListener("click", () => toggleModal(loginModal, false));

    function processChartData(data) {
        return {
            labels: data.map(row => row.day),
            datasets: [
                { label: "Category A", data: data.map(row => row.A), backgroundColor: "rgba(255, 99, 132, 0.5)" },
                { label: "Category B", data: data.map(row => row.B), backgroundColor: "rgba(54, 162, 235, 0.5)" }
            ]
        };
    }

    let barChart, lineChart;
    function showCharts() {
        const jsonData = [
            { day: "4/10/2022", age: "15-25", gender: "Male", A: 260, B: 167 },
            { day: "4/10/2022", age: ">25", gender: "Male", A: 265, B: 460 },
            { day: "4/10/2022", age: "15-25", gender: "Female", A: 630, B: 761 },
            { day: "4/10/2022", age: ">25", gender: "Female", A: 248, B: 889 }
        ];

        let chartData = processChartData(jsonData);

        barChart = new Chart(barChartCanvas.getContext("2d"), { type: "bar", data: chartData });
        lineChart = new Chart(lineChartCanvas.getContext("2d"), { type: "line", data: chartData });

        filter.addEventListener("change", () => {
            let selectedGender = filter.value;
            let filteredData = jsonData.filter(row => selectedGender === "all" || row.gender.toLowerCase() === selectedGender.toLowerCase());

            let newChartData = processChartData(filteredData);
            barChart.data = newChartData;
            barChart.update();
            lineChart.data = newChartData;
            lineChart.update();
        });
    }

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        toggleModal(loginModal, false);
        chartsSection.style.display = "block";
        loginBtn.style.display = "none";
        logoutBtn.style.display = "block";
        showCharts();
    });

    logoutBtn.addEventListener("click", () => {
        chartsSection.style.display = "none";
        loginBtn.style.display = "inline";
        logoutBtn.style.display = "none";

        if (barChart) {
            barChart.destroy();
            lineChart.destroy();
        }
    });

});
