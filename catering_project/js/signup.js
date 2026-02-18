import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from 
"https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import { setDoc, doc } from 
"https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

window.signupUser = async function () {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 🔥 Save user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      role: "user"
    });

    alert("Signup Successful!");
    window.location.href = "login.html";

  } catch (error) {
    alert(error.message);
  }
};