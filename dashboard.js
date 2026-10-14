if (!localStorage.getItem("loggedInUser")) {
    window.location.href = "login.html";
}


const whsList7 =
    JSON.parse(localStorage.getItem("whsList")) || [];

const beneficiaries7 =
    JSON.parse(localStorage.getItem("beneficiaries")) || [];

const activities7 =
    JSON.parse(localStorage.getItem("activities")) || [];

const maintenance7 =
    JSON.parse(
        localStorage.getItem("maintenanceRecords")
    ) || [];


// Total WHS

document.getElementById("totalWHS").innerText =
    whsList7.length;


// Total beneficiaries

document.getElementById("totalBeneficiaries").innerText =
    beneficiaries7.length;


// Activity counts

document.getElementById("agriculture").innerText =
    beneficiaries7.filter(
        b => b.activity === "Agriculture"
    ).length;


document.getElementById("irrigation").innerText =
    beneficiaries7.filter(
        b => b.activity === "Irrigation"
    ).length;


document.getElementById("fisheries").innerText =
    beneficiaries7.filter(
        b => b.activity === "Fisheries"
    ).length;


document.getElementById("livestock").innerText =
    beneficiaries7.filter(
        b => b.activity === "Livestock"
    ).length;


// Active WHS

document.getElementById("activeWHS").innerText =
    whsList7.filter(
        w => w.status === "Active"
    ).length;


// Maintenance

document.getElementById("maintenance").innerText =
    maintenance7.length;


// WHS table

const table =
    document.getElementById("whsTable");

whsList7.forEach(w => {

    table.innerHTML += `
    <tr>
        <td>${w.whsId}</td>
        <td>${w.district}</td>
        <td>${w.village}</td>
        <td>${w.status}</td>
    </tr>`;
});


function previous() {
    window.location.href = "maintenance.html";
}


function next() {
    window.location.href = "reports.html";
}


function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}