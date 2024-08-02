let hamburgerShow = false;
let hamburgerIcon = document.getElementById('hamburger-icon');


function hamburgerToggle() {
  hamburgerShow = !hamburgerShow;
  let hamburgerMenu = document.getElementById('hamburger-menu');
  if (hamburgerShow) {
    hamburgerMenu.style.height = "90px";
  } else {
    hamburgerMenu.style.height = "0";
  }
}

hamburgerIcon.addEventListener("click", hamburgerToggle);