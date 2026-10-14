if (!localStorage.getItem("loggedInUser")) {
    window.location.href = "login.html";
}

let whsList5 =
    JSON.parse(localStorage.getItem("whsList")) || [];

let beneficiaries5 =
    JSON.parse(localStorage.getItem("beneficiaries")) || [];

let benefits =
    JSON.parse(localStorage.getItem("benefits")) || [];


function loadData() {

    const whs =
        document.getElementById("whs");

    const beneficiary =
        document.getElementById("beneficiary");

    whs.innerHTML =
        '<option value="">Select WHS</option>';

    beneficiary.innerHTML =
        '<option value="">Select Beneficiary</option>';


    whsList5.forEach(w => {

        whs.innerHTML += `
        <option value="${w.whsId}">
            ${w.whsId} - ${w.village}
        </option>`;
    });


    beneficiaries5.forEach(b => {

        beneficiary.innerHTML += `
        <option value="${b.beneficiaryId}">
            ${b.beneficiaryId} - ${b.name}
        </option>`;
    });
}


document.getElementById("benefitForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    benefits.push({

        whs: document.getElementById("whs").value,

        beneficiary:
            document.getElementById("beneficiary").value,

        benefitType:
            document.getElementById("benefitType").value,

        date:
            document.getElementById("date").value,

        description:
            document.getElementById("description").value
    });

    localStorage.setItem(
        "benefits",
        JSON.stringify(benefits)
    );

    this.reset();

    displayBenefits();
});


function displayBenefits() {

    const table =
        document.getElementById("benefitTable");

    table.innerHTML = "";

    benefits.forEach(b => {

        table.innerHTML += `
        <tr>
            <td>${b.whs}</td>
            <td>${b.beneficiary}</td>
            <td>${b.benefitType}</td>
            <td>${b.date}</td>
            <td>${b.description}</td>
        </tr>`;
    });
}


function previous() {
    window.location.href = "activities.html";
}


function next() {
    window.location.href = "maintenance.html";
}


function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}


loadData();
displayBenefits();