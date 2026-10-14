if (!localStorage.getItem("loggedInUser")) {
    window.location.href = "login.html";
}


const whsList8 =
    JSON.parse(localStorage.getItem("whsList")) || [];

const beneficiaries8 =
    JSON.parse(localStorage.getItem("beneficiaries")) || [];

const activities8 =
    JSON.parse(localStorage.getItem("activities")) || [];

const maintenance8 =
    JSON.parse(
        localStorage.getItem("maintenanceRecords")
    ) || [];


function whsReport() {

    let html = `
        <h2>WHS-wise Report</h2>

        <table>
        <tr>
            <th>WHS ID</th>
            <th>District</th>
            <th>Taluk</th>
            <th>Village</th>
            <th>Type</th>
            <th>Status</th>
        </tr>
    `;

    whsList8.forEach(w => {

        html += `
        <tr>
            <td>${w.whsId}</td>
            <td>${w.district}</td>
            <td>${w.taluk}</td>
            <td>${w.village}</td>
            <td>${w.structureType}</td>
            <td>${w.status}</td>
        </tr>`;
    });

    html += "</table>";

    document.getElementById("reportArea").innerHTML =
        html;
}


function beneficiaryReport() {

    let html = `
        <h2>Beneficiary-wise Report</h2>

        <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Village</th>
            <th>WHS</th>
            <th>Activity</th>
        </tr>
    `;

    beneficiaries8.forEach(b => {

        html += `
        <tr>
            <td>${b.beneficiaryId}</td>
            <td>${b.name}</td>
            <td>${b.village}</td>
            <td>${b.whs}</td>
            <td>${b.activity}</td>
        </tr>`;
    });

    html += "</table>";

    document.getElementById("reportArea").innerHTML =
        html;
}


function activityReport() {

    let html = `
        <h2>Activity-wise Report</h2>

        <table>
        <tr>
            <th>WHS</th>
            <th>Village</th>
            <th>Activity</th>
            <th>Beneficiaries</th>
        </tr>
    `;

    activities8.forEach(a => {

        html += `
        <tr>
            <td>${a.whs}</td>
            <td>${a.village}</td>
            <td>${a.activityType}</td>
            <td>${a.beneficiaryCount}</td>
        </tr>`;
    });

    html += "</table>";

    document.getElementById("reportArea").innerHTML =
        html;
}


function maintenanceReport() {

    let html = `
        <h2>Maintenance Report</h2>

        <table>
        <tr>
            <th>WHS</th>
            <th>Condition</th>
            <th>Problem</th>
            <th>Action</th>
            <th>Date</th>
        </tr>
    `;

    maintenance8.forEach(m => {

        html += `
        <tr>
            <td>${m.whs}</td>
            <td>${m.condition}</td>
            <td>${m.problem}</td>
            <td>${m.action}</td>
            <td>${m.date}</td>
        </tr>`;
    });

    html += "</table>";

    document.getElementById("reportArea").innerHTML =
        html;
}


function villageReport() {

    let villageCount = {};

    whsList8.forEach(w => {

        if (!villageCount[w.village]) {
            villageCount[w.village] = 0;
        }

        villageCount[w.village]++;
    });


    let html = `
        <h2>Village-wise WHS Report</h2>

        <table>
        <tr>
            <th>Village</th>
            <th>Number of WHSs</th>
        </tr>
    `;


    Object.keys(villageCount).forEach(village => {

        html += `
        <tr>
            <td>${village}</td>
            <td>${villageCount[village]}</td>
        </tr>`;
    });


    html += "</table>";

    document.getElementById("reportArea").innerHTML =
        html;
}


function previous() {
    window.location.href = "dashboard.html";
}


function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "login.html";
}