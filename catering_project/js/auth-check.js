// Import Firebase auth
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// Check login state
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Not logged in
    alert("Please login first!");
    
    window.location.href = "login.html";  // change if your login page name is different
  }
});