function login(event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;

    const role =
        document.getElementById("role").value;

    if (
        username === "admin" &&
        password === "admin123" &&
        role === "Admin"
    ) {

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify({
                username: username,
                role: role
            })
        );

        window.location.href = "whs.html";
    }

    else if (
        username === "officer" &&
        password === "officer123" &&
        role === "Project Officer"
    ) {

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify({
                username: username,
                role: role
            })
        );

        window.location.href = "whs.html";
    }

    else {

        document.getElementById("loginMessage").innerText =
            "Invalid username, password or role.";

        document.getElementById("loginMessage").style.color = "red";
    }
}