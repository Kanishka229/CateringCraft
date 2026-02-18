import { auth, db } from "./firebase.js";
import { 
  onAuthStateChanged,
  signOut 
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import { doc, getDoc } from 
"https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";


const ordersContainer = document.getElementById("ordersContainer");
const reservationsContainer = document.getElementById("reservationsContainer");



// sjkjkqw

auth.onAuthStateChanged( async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    document.getElementById("userName").innerText = docSnap.data().name;
    document.getElementById("userEmail").innerText = docSnap.data().email;
     loadOrders(user.uid);
     loadReservations(user.uid);
  } 
  else {
    console.log("No such document!");
  }

});

// Load Orders
window.goToOrders = function() {
  document.getElementById("ordersContainer").scrollIntoView();
  
};
async function loadOrders(uid) {
  ordersContainer.innerHTML = "";

  const q = query(collection(db, "orders"), where("userId", "==", uid));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    ordersContainer.innerHTML = "<p>No orders found</p>";
    return;
  }

  snapshot.forEach(doc => {
    const order = doc.data();

    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <p><strong>Order ID:</strong> ${doc.id}</p>
      <p><strong>Total:</strong> ₹${order.total}</p>
      <p><strong>Status:</strong> ${order.status}</p>
    `;
    ordersContainer.appendChild(div);
  });
}

// Load Reservations
window.goToReservations = function() {
  document.getElementById("reservationsContainer").scrollIntoView();
};
async function loadReservations(uid) {
  reservationsContainer.innerHTML = "";

  const q = query(collection(db, "reservations"),where("userId", "==", uid));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    reservationsContainer.innerHTML = "<p>No reservations found</p>";
    return;
  }

  snapshot.forEach(doc => {
    const res = doc.data();

    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <p><strong>Date:</strong> ${res.date}</p>
      <p><strong>Guests:</strong> ${res.guests}</p>
      <p><strong>Status:</strong> ${res.status || "Pending"}</p>
    `;
    reservationsContainer.appendChild(div);
  });
}

// Logout
window.logout = async function() {
  await signOut(auth);
  window.location.href = "index.html";
};

// Optional navigation
// window.goToOrders = function() {
//   document.getElementById("ordersContainer").scrollIntoView();
// };

// window.goToReservations = function() {
//   document.getElementById("reservationsContainer").scrollIntoView();
// };