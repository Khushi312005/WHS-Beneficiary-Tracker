const user3 = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if (!user3) {
    window.location.href = "login.html";
}


let whsList3 =
    JSON.parse(localStorage.getItem("whsList")) || [];

let beneficiaries =
    JSON.parse(localStorage.getItem("beneficiaries")) || [];


function loadWHS() {

    const select =
        document.getElementById("whs");

    select.innerHTML =
        '<option value="">Select WHS</option>';

    whsList3.forEach(w => {

        select.innerHTML += `
        <option value="${w.whsId}">
            ${w.whsId} - ${w.village}
        </option>`;
    });
}


document.getElementById("beneficiaryForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const beneficiary = {

        beneficiaryId:
            document.getElementById("beneficiaryId").value,

        name:
            document.getElementById("name").value,

        village:
            document.getElementById("village").value,

        whs:
            document.getElementById("whs").value,

        activity:
            document.getElementById("activity").value,

        contact:
            document.getElementById("contact").value
    };

    beneficiaries.push(beneficiary);

    localStorage.setItem(
        "beneficiaries",
        JSON.stringify(beneficiaries)
    );

    this.reset();

    displayBeneficiaries();
});


function displayBeneficiaries() {

    const table =
        document.getElementById("beneficiaryTable");

    table.innerHTML = "";

    beneficiaries.forEach((b, index) => {

        table.innerHTML += `
        <tr>
            <td>${b.beneficiaryId}</td>
            <td>${b.name}</td>
            <td>${b.village}</td>
            <td>${b.whs}</td>
            <td>${b.activity}</td>
            <td>${b.contact}</td>
            <td>
                <button onclick="deleteBeneficiary(${index})">
                    Delete
                </button>
            </td>
        </tr>`;
    });
}


function deleteBeneficiary(index) {

    beneficiaries.splice(index, 1);

    localStorage.setItem(
        "beneficiaries",
        JSON.stringify(beneficiaries)
    );

    displayBeneficiaries();
}


function backToWHS() {
    window.location.href = "whs.html";
}


function nextModule() {
    window.location.href = "activities.html";
}


function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}


loadWHS();
displayBeneficiaries();