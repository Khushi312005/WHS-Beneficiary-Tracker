if (!localStorage.getItem("loggedInUser")) {
    window.location.href = "login.html";
}

let whsList6 =
    JSON.parse(localStorage.getItem("whsList")) || [];

let maintenanceRecords =
    JSON.parse(
        localStorage.getItem("maintenanceRecords")
    ) || [];


function loadWHS() {

    const select =
        document.getElementById("whs");

    select.innerHTML =
        '<option value="">Select WHS</option>';

    whsList6.forEach(w => {

        select.innerHTML += `
        <option value="${w.whsId}">
            ${w.whsId} - ${w.village}
        </option>`;
    });
}


document.getElementById("maintenanceForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    maintenanceRecords.push({

        whs:
            document.getElementById("whs").value,

        condition:
            document.getElementById("condition").value,

        problem:
            document.getElementById("problem").value,

        action:
            document.getElementById("action").value,

        date:
            document.getElementById("date").value
    });

    localStorage.setItem(
        "maintenanceRecords",
        JSON.stringify(maintenanceRecords)
    );

    this.reset();

    displayMaintenance();
});


function displayMaintenance() {

    const table =
        document.getElementById("maintenanceTable");

    table.innerHTML = "";

    maintenanceRecords.forEach(m => {

        table.innerHTML += `
        <tr>
            <td>${m.whs}</td>
            <td>${m.condition}</td>
            <td>${m.problem}</td>
            <td>${m.action}</td>
            <td>${m.date}</td>
        </tr>`;
    });
}


function previous() {
    window.location.href = "benefits.html";
}


function next() {
    window.location.href = "dashboard.html";
}


function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}


loadWHS();
displayMaintenance();