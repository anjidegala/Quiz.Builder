
function login(e) {
  e.preventDefault();

  const email = document.getElementById("u").value.trim().toLowerCase();
  const password = document.getElementById("p").value;

  const users = JSON.parse(localStorage.getItem("quizUsers") || "[]");

  const user = users.find(
    x => x.email.toLowerCase() === email && x.password === password
  );

  const err = document.getElementById("err");

  if (!user) {
    err.textContent = "Invalid email or password.";
    return;
  }

  localStorage.setItem("logged", "yes");
  localStorage.setItem("role", "user");
  localStorage.setItem("currentUser", user.email);

  location.href = "user-dashboard.html";
}

function signup(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("sp").value;
  const confirm = document.getElementById("cp").value;
  const msg = document.getElementById("signupMsg");

  if (password !== confirm) {
    msg.textContent = "Passwords do not match.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("quizUsers") || "[]");

  if (users.some(x => x.email.toLowerCase() === email)) {
    msg.textContent = "Email already registered.";
    return;
  }

  users.push({ name, email, password });

  localStorage.setItem("quizUsers", JSON.stringify(users));

  msg.textContent = "Registration successful!";

  setTimeout(() => location.href = "login.html", 1000);
}

function guard(role) {
  if (
    localStorage.getItem("logged") !== "yes" ||
    localStorage.getItem("role") !== role
  ) {
    location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("logged");
  localStorage.removeItem("role");
  localStorage.removeItem("currentUser");
  location.href = "login.html";
}

window.loginRole = "user";