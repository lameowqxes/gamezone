const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    if (login === "admin" && password === "12345") {

        localStorage.setItem("adminLoggedIn", "true");

        window.location.href = "admin.html";

    } else {

        loginMessage.textContent =
            "Неверный логин или пароль.";

    }
});