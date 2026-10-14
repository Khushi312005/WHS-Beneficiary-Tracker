if (!localStorage.getItem("loggedInUser")) {
    window.location.href = "login.html";
}

let whsList4 =
    JSON.parse(localStorage.getItem("whsList")) || [];

let activities =
    JSON.parse(localStorage.getItem("activities")) || [];


function loadWHS() {

    const select = document.getElementById("whs");

    select.innerHTML =
        '<option value="">Select WHS</option>';

    whsList4.forEach(w => {

        select.innerHTML += `
        <option value="${w.whsId}">
            ${w.whsId} - ${w.village}
        </option>`;
    });
}


document.getElementById("activityForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    activities.push({

        whs:
            document.getElementById("whs").value,

        village:
            document.getElementById("village").value,

        activityType:
            document.getElementById("activityType").value,

        beneficiaryCount:
            document.getElementById("beneficiaryCount").value,

        description:
            document.getElementById("description").value
    });

    localStorage.setItem(
        "activities",
        JSON.stringify(activities)
    );

    this.reset();

    displayActivities();
});


function displayActivities() {

    const table =
        document.getElementById("activityTable");

    table.innerHTML = "";

    activities.forEach(a => {

        table.innerHTML += `
        <tr>
            <td>${a.whs}</td>
            <td>${a.village}</td>
            <td>${a.activityType}</td>
            <td>${a.beneficiaryCount}</td>
            <td>${a.description}</td>
        </tr>`;
    });
}


function previous() {
    window.location.href = "beneficiaries.html";
}


function next() {
    window.location.href = "benefits.html";
}


function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}


loadWHS();
displayActivities();