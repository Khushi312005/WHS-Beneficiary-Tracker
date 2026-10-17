
const user = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if (!user) {
    window.location.href = "login.html";
} else {
    document.getElementById("user").textContent =
        user.role + ": " + user.username;
}

let whsList = [];

// Load WHS records from MySQL through the backend API.
async function displayWHS() {
    const table = document.getElementById("whsTable");
    table.replaceChildren();

    try {
        const response = await fetch("/api/whs");

        if (!response.ok) {
            throw new Error("Could not load WHS records.");
        }

        const records = await response.json();

        // Convert MySQL column names to the names used by the HTML form.
        whsList = records.map(record => ({
            whsId: record.whs_id,
            district: record.district,
            taluk: record.taluk,
            village: record.village,
            structureType: record.structure_type,
            status: record.status,
            year: record.construction_year,
            area: record.area,
            problem: record.problem
        }));

        whsList.forEach(whs => {
            const row = document.createElement("tr");

            [
                whs.whsId,
                whs.district,
                whs.taluk,
                whs.village,
                whs.structureType,
                whs.status,
                whs.year
            ].forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value ?? "";
                row.appendChild(cell);
            });

            const actionCell = document.createElement("td");
            const deleteButton = document.createElement("button");

            deleteButton.textContent = "Delete";
            deleteButton.className = "delete";

            deleteButton.addEventListener("click", () => {
                deleteWHS(whs.whsId);
            });

            actionCell.appendChild(deleteButton);
            row.appendChild(actionCell);
            table.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading WHS:", error);
        alert("Could not load WHS records. Check that the backend is running.");
    }
}

// Save a WHS record in MySQL.
document.getElementById("whsForm")
    .addEventListener("submit", async function (event) {
        event.preventDefault();

        const whs = {
            whsId: document.getElementById("whsId").value.trim(),
            district: document.getElementById("district").value.trim(),
            taluk: document.getElementById("taluk").value.trim(),
            village: document.getElementById("village").value.trim(),
            structureType:
                document.getElementById("structureType").value,
            status: document.getElementById("status").value,
            year: document.getElementById("year").value,
            area: document.getElementById("area").value,
            problem: document.getElementById("problem").value.trim()
        };

        try {
            const response = await fetch("/api/whs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(whs)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to save WHS record."
                );
            }

            this.reset();

            await displayWHS();

            alert("WHS saved successfully in the database.");

        } catch (error) {
            console.error("Error saving WHS:", error);
            alert(error.message || "Could not save WHS record.");
        }
    });

// Delete a WHS record from MySQL.
async function deleteWHS(whsId) {
    if (!confirm("Are you sure you want to delete this WHS record?")) {
        return;
    }

    try {
        const response = await fetch(
            "/api/whs/" + encodeURIComponent(whsId),
            { method: "DELETE" }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to delete WHS record."
            );
        }

        await displayWHS();

        alert("WHS record deleted successfully.");

    } catch (error) {
        console.error("Error deleting WHS:", error);
        alert(error.message || "Could not delete WHS record.");
    }
}

// Go to Beneficiary Management only if a WHS record exists.
function nextModule() {
    if (whsList.length === 0) {
        alert("Please add at least one WHS.");
        return;
    }

    window.location.href = "beneficiaries.html";
}

// Log out of the existing frontend login.
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

// Load saved records when the page opens.
if (user) {
    displayWHS();
}
