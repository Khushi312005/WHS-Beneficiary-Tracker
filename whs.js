const user = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if (!user) {
    window.location.href = "login.html";
}

document.getElementById("user").innerText =
    user.role + ": " + user.username;

let whsList =
    JSON.parse(localStorage.getItem("whsList")) || [];


document.getElementById("whsForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const whs = {
        whsId: document.getElementById("whsId").value,
        district: document.getElementById("district").value,
        taluk: document.getElementById("taluk").value,
        village: document.getElementById("village").value,
        structureType:
            document.getElementById("structureType").value,
        status: document.getElementById("status").value,
        year: document.getElementById("year").value,
        area: document.getElementById("area").value,
        problem: document.getElementById("problem").value
    };

    if (whsList.some(x => x.whsId === whs.whsId)) {
        alert("WHS ID already exists.");
        return;
    }

    whsList.push(whs);

    localStorage.setItem(
        "whsList",
        JSON.stringify(whsList)
    );

    this.reset();

    displayWHS();

    alert("WHS saved successfully.");
});


function displayWHS() {

    const table =
        document.getElementById("whsTable");

    table.innerHTML = "";

    whsList.forEach((whs, index) => {

        table.innerHTML += `
        <tr>
            <td>${whs.whsId}</td>
            <td>${whs.district}</td>
            <td>${whs.taluk}</td>
            <td>${whs.village}</td>
            <td>${whs.structureType}</td>
            <td>${whs.status}</td>
            <td>${whs.year}</td>

            <td>
                <button
                    class="delete"
                    onclick="deleteWHS(${index})">
                    Delete
                </button>
            </td>
        </tr>`;
    });
}


function deleteWHS(index) {

    whsList.splice(index, 1);

    localStorage.setItem(
        "whsList",
        JSON.stringify(whsList)
    );

    displayWHS();
}


function nextModule() {

    if (whsList.length === 0) {
        alert("Please add at least one WHS.");
        return;
    }

    window.location.href =
        "beneficiaries.html";
}


function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href =
        "login.html";
}


displayWHS();