

import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from
"https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

const ADMIN_EMAIL = "admin@cateringcraft.gmail.com";

window.userLogin = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch(err => alert(err.message));
};

window.adminLogin = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email !== ADMIN_EMAIL) {
    alert("Not an admin account");
    return;
  }

  signInWithEmailAndPassword(auth, email,password)
    .then(() => {
      window.location.href = "/admin/dashboard.html";
    })
    .catch(err => alert(err.message));
};