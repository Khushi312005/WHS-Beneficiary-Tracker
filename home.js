// Check whether user is logged in

const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));


if (!loggedInUser) {

    window.location.href = "login.html";

}


// Display logged-in user

document.getElementById("userInfo").innerText =
    "Logged in as: " +
    loggedInUser.username +
    " (" +
    loggedInUser.role +
    ")";


// Open any module

function goTo(page) {

    window.location.href = page;

}


// Logout

function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "login.html";

}