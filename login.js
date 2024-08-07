user = {
  username: "Username",
  password: "password1234"
}


function redirect() {
  if (localStorage.getItem("isLoggedIn") == "true") {
    window.location.href = "/today.html";
  }
}

function check() {
  let usernameInput = document.getElementById('username');
  let passwordInput = document.getElementById('password');
  if (usernameInput.value == user.username && passwordInput.value == user.password) {
    console.log("Login Successful!");
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem('username', usernameInput.value);
    usernameInput.value = '';
    passwordInput.value = '';
    redirect();
  }
}