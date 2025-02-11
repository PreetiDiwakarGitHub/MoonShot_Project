document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");
    const signupBtn = document.getElementById("signup-btn");
    const loginModal = document.getElementById("login-modal");
    const signupModal = document.getElementById("signup-modal");
    const closeLogin = document.getElementById("close-login");
    const closeSignup = document.getElementById("close-signup");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const chartsSection = document.getElementById("charts-section");
    const filter = document.getElementById("filter");
    const barChartCanvas = document.getElementById("barChart");
    const lineChartCanvas = document.getElementById("lineChart");
    const ageInput = document.getElementById("age");
    const ageValue = document.getElementById("age-value");

    let loggedInUsers = new Set(JSON.parse(localStorage.getItem("loggedInUsers")) || []);
    loginBtn.addEventListener("click", () => {
        loginModal.style.display = "block";
        signupModal.style.display = "none";
    });
    signupBtn.addEventListener("click", () => {
        if (loggedInUsers.size === 0) {
            alert("Please login first before signing up!");
        } else {
            signupModal.style.display = "block";
            loginModal.style.display = "none";
        }
    });
    closeLogin.addEventListener("click", () => loginModal.style.display = "none");
    closeSignup.addEventListener("click", () => signupModal.style.display = "none");
    window.addEventListener("click", (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = "none";
        } else if (event.target === signupModal) {
            signupModal.style.display = "none";
        }
    });
    const logoutBtn = document.createElement("button");
    logoutBtn.id = "logout-btn";
    logoutBtn.textContent = "Logout";
    logoutBtn.style.display = loggedInUsers.size > 0 ? "block" : "none";
    document.querySelector(".auth-buttons").appendChild(logoutBtn);
    const darkModeBtn = document.createElement("button");
    darkModeBtn.id = "dark-mode-toggle";
    darkModeBtn.textContent = "Toggle Dark Mode";
    document.querySelector(".auth-buttons").appendChild(darkModeBtn);
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });

    
    function checkLoginStatus() {
        if (loggedInUsers.size > 0) {
            chartsSection.style.display = "block";
            logoutBtn.style.display = "block";
        } else {
            logoutBtn.style.display = "none";
        }
    }
    checkLoginStatus();

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("login-email").value;

        if (loggedInUsers.has(email)) {
            alert("You are already logged in with this email!");
        } else {
            loggedInUsers.add(email);
            localStorage.setItem("loggedInUsers", JSON.stringify([...loggedInUsers]));

            loginModal.style.display = "none";
            chartsSection.style.display = "block";
            logoutBtn.style.display = "block";
            showCharts();
        }
    });

    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("signup-email").value;

        if (!loggedInUsers.has(email)) {
            alert("You must log in first before signing up!");
        } else {
            alert("Signup successful!");
            signupModal.style.display = "none";
        }
    });

    logoutBtn.addEventListener("click", () => {
        loggedInUsers.clear();
        localStorage.removeItem("loggedInUsers");
        chartsSection.style.display = "none";
        logoutBtn.style.display = "none";
    });

    ageInput.addEventListener("input", () => {
        ageValue.textContent = ageInput.value + " years";
    });

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

        if (!barChart) {
            barChart = new Chart(barChartCanvas.getContext("2d"), { type: "bar", data: chartData });
        } else {
            barChart.data = chartData;
            barChart.update();
        }

        if (!lineChart) {
            lineChart = new Chart(lineChartCanvas.getContext("2d"), { type: "line", data: chartData });
        } else {
            lineChart.data = chartData;
            lineChart.update();
        }

        filter.addEventListener("change", () => {
            let selectedGender = filter.value;
            let filteredData = jsonData.filter(row => 
                selectedGender === "all" || row.gender.toLowerCase() === selectedGender.toLowerCase()
            );
            let newChartData = processChartData(filteredData);
            barChart.data = newChartData;
            barChart.update();
            lineChart.data = newChartData;
            lineChart.update();
        });
    }
});
