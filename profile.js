let profileExtendDiv = document.getElementById('profile-extend');
let username = document.getElementById('username');
let isProfileExtend = false;

username.innerHTML = localStorage.getItem('username');

function displayProfile() {
  if (isProfileExtend) {
    profileExtendDiv.style.display = 'block';
  } else {
    profileExtendDiv.style.display = 'none';
  }
}
displayProfile();

function profileExtend() {
  isProfileExtend = !isProfileExtend;
  displayProfile();
}


function redirect() {
  if (localStorage.getItem("isLoggedIn") == "false") {
    window.location.href = "/index.html";
  }
}

function logout() {
  localStorage.setItem("isLoggedIn", "false");
  localStorage.removeItem('username');
  redirect();
}

redirect();