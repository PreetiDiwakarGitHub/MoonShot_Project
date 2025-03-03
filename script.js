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

    let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    let loggedInUsers = JSON.parse(localStorage.getItem("loggedInUsers")) || [];

    loginBtn.addEventListener("click", () => {
        loginModal.style.display = "block";
        signupModal.style.display = "none";
    });

    signupBtn.addEventListener("click", () => {
        signupModal.style.display = "block";
        loginModal.style.display = "none";
    });

    closeLogin.addEventListener("click", () => loginModal.style.display = "none");
    closeSignup.addEventListener("click", () => signupModal.style.display = "none");

    window.addEventListener("click", (event) => {
        if (event.target === loginModal) loginModal.style.display = "none";
        if (event.target === signupModal) signupModal.style.display = "none";
    });

    const logoutBtn = document.createElement("button");
    logoutBtn.id = "logout-btn";
    logoutBtn.textContent = "Logout";
    logoutBtn.style.display = loggedInUsers.length > 0 ? "block" : "none";
    document.querySelector(".auth-buttons").appendChild(logoutBtn);

    function checkLoginStatus() {
        if (loggedInUsers.length > 0) {
            chartsSection.style.display = "block";
            logoutBtn.style.display = "block";
        } else {
            chartsSection.style.display = "none";
            logoutBtn.style.display = "none";
        }
    }
    checkLoginStatus();

    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("signup-email").value.trim();

        if (registeredUsers.includes(email)) {
            alert("This email is already registered. Please log in.");
        } else {
            registeredUsers.push(email);
            localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
            alert("Signup successful! Now you can log in.");
            signupModal.style.display = "none";
        }
    });

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("login-email").value.trim();

        if (!registeredUsers.includes(email)) {
            alert("This email is not registered. Please sign up first.");
        } else if (loggedInUsers.includes(email)) {
            alert("You are already logged in!");
        } else {
            loggedInUsers.push(email);
            localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));
            loginModal.style.display = "none";
            chartsSection.style.display = "block";
            logoutBtn.style.display = "block";
            showCharts();
        }
    });

    logoutBtn.addEventListener("click", () => {
        loggedInUsers = [];
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



// document.addEventListener("DOMContentLoaded", () => {
//     const loginBtn = document.getElementById("login-btn");
//     const signupBtn = document.getElementById("signup-btn");
//     const loginModal = document.getElementById("login-modal");
//     const signupModal = document.getElementById("signup-modal");
//     const closeLogin = document.getElementById("close-login");
//     const closeSignup = document.getElementById("close-signup");
//     const loginForm = document.getElementById("login-form");
//     const signupForm = document.getElementById("signup-form");
//     const chartsSection = document.getElementById("charts-section");
//     const filter = document.getElementById("filter");
//     const barChartCanvas = document.getElementById("barChart");
//     const lineChartCanvas = document.getElementById("lineChart");
//     const ageInput = document.getElementById("age");
//     const ageValue = document.getElementById("age-value"); 

//     let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
//     let loggedInUsers = JSON.parse(localStorage.getItem("loggedInUsers")) || [];

//     loginBtn.addEventListener("click", () => {
//         loginModal.style.display = "block";
//         signupModal.style.display = "none";
//     });

//     signupBtn.addEventListener("click", () => {
//         signupModal.style.display = "block";
//         loginModal.style.display = "none";
//     });

//     closeLogin.addEventListener("click", () => loginModal.style.display = "none");
//     closeSignup.addEventListener("click", () => signupModal.style.display = "none");

//     window.addEventListener("click", (event) => {
//         if (event.target === loginModal) loginModal.style.display = "none";
//         if (event.target === signupModal) signupModal.style.display = "none";
//     });

//     const logoutBtn = document.createElement("button");
//     logoutBtn.id = "logout-btn";
//     logoutBtn.textContent = "Logout";
//     logoutBtn.style.display = loggedInUsers.length > 0 ? "block" : "none";
//     document.querySelector(".auth-buttons").appendChild(logoutBtn);

//     function checkLoginStatus() {
//         if (loggedInUsers.length > 0) {
//             chartsSection.style.display = "block";
//             logoutBtn.style.display = "block";
//         } else {
//             chartsSection.style.display = "none";
//             logoutBtn.style.display = "none";
//         }
//     }
//     checkLoginStatus();

//     signupForm.addEventListener("submit", (event) => {
//         event.preventDefault();
//         const email = document.getElementById("signup-email").value.trim();

//         if (registeredUsers.includes(email)) {
//             alert("This email is already registered. Please log in.");
//         } else {
//             registeredUsers.push(email);
//             localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
//             alert("Signup successful! Now you can log in.");
//             signupModal.style.display = "none";
//         }
//     });

//     loginForm.addEventListener("submit", (event) => {
//         event.preventDefault();
//         const email = document.getElementById("login-email").value.trim();

//         if (!registeredUsers.includes(email)) {
//             alert("This email is not registered. Please sign up first.");
//         } else if (loggedInUsers.includes(email)) {
//             alert("You are already logged in!");
//         } else {
//             loggedInUsers.push(email);
//             localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));
//             loginModal.style.display = "none";
//             chartsSection.style.display = "block";
//             logoutBtn.style.display = "block";
//             showCharts();
//         }
//     });

//     logoutBtn.addEventListener("click", () => {
//         loggedInUsers = [];
//         localStorage.removeItem("loggedInUsers");
//         chartsSection.style.display = "none";
//         logoutBtn.style.display = "none";
//     });

//     ageInput.addEventListener("input", () => {
//         ageValue.textContent = ageInput.value + " years";
//     });

//     function processChartData(data) {
//         return {
//             labels: data.map(row => row.date),
//             datasets: [
//                 { label: "15-25 Male", data: data.map(row => row.data[0].values[0]), backgroundColor: "rgba(255, 99, 132, 0.5)" },
//                 { label: ">25 Male", data: data.map(row => row.data[1].values[0]), backgroundColor: "rgba(54, 162, 235, 0.5)" },
//                 { label: "15-25 Female", data: data.map(row => row.data[2].values[0]), backgroundColor: "rgba(255, 206, 86, 0.5)" },
//                 { label: ">25 Female", data: data.map(row => row.data[3].values[0]), backgroundColor: "rgba(75, 192, 192, 0.5)" }
//             ]
//         };
//     }

//     let barChart, lineChart;

//     let jsonData = [
//         { date: "4/10/2022", data: [
//             { age: "15-25", gender: "Male", values: [898, 433, 127] },
//             { age: ">25", gender: "Male", values: [20, 792, 993] },
//             { age: "15-25", gender: "Female", values: [86, 546, 423] },
//             { age: ">25", gender: "Female", values: [256, 997, 915] }
//         ] },
//         { date: "5/10/2022", data: [
//             { age: "15-25", gender: "Male", values: [25, 761, 397] },
//             { age: ">25", gender: "Male", values: [5, 834, 907] },
//             { age: "15-25", gender: "Female", values: [387, 770, 748] },
//             { age: ">25", gender: "Female", values: [692, 209, 747] }
//         ] },
//         { date: "6/10/2022", data: [
//             { age: "15-25", gender: "Male", values: [0, 877, 785] },
//             { age: ">25", gender: "Male", values: [410, 753, 943] },
//             { age: "15-25", gender: "Female", values: [129, 220, 945] },
//             { age: ">25", gender: "Female", values: [25, 876, 767] }
//         ] }
//     ];

//     function showCharts() {
//         if (!barChartCanvas || !lineChartCanvas) {
//             console.error("Chart canvas elements not found.");
//             return;
//         }

//         let chartData = processChartData(jsonData);

//         if (!barChart) {
//             barChart = new Chart(barChartCanvas.getContext("2d"), { type: "bar", data: chartData });
//         } else {
//             barChart.data = chartData;
//             barChart.update();
//         }

//         if (!lineChart) {
//             lineChart = new Chart(lineChartCanvas.getContext("2d"), { type: "line", data: chartData });
//         } else {
//             lineChart.data = chartData;
//             lineChart.update();
//         }
//     }

//     filter.addEventListener("change", () => {
//         let selectedGender = filter.value;
//         let filteredData = jsonData.map(row => ({
//             date: row.date,
//             data: row.data.filter(item => selectedGender === "all" || item.gender.toLowerCase() === selectedGender.toLowerCase())
//         }));

//         let newChartData = processChartData(filteredData);
//         barChart.data = newChartData;
//         barChart.update();
//         lineChart.data = newChartData;
//         lineChart.update();
//     });
// });
