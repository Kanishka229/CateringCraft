

// Temporary values (Firebase later)
// document.getElementById("totalDishes").innerText = 12;
// document.getElementById("totalReservations").innerText = 8;
// document.getElementById("pendingReservations").innerText = 3;
// document.getElementById("totalCustomers").innerText = 5;



// import { auth, db } from "../js/firebase.js";

// import {
//   collection,
//   onSnapshot,
//   doc,
//   updateDoc
// } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// import {
//   onAuthStateChanged,
//   signOut
// } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";


// // 🔐 Protect Page
// onAuthStateChanged(auth, (user) => {
//   if (!user) {
//     window.location.href = "../login.html";
//   }
// });


// // 🔥 Total Users
// onSnapshot(collection(db, "users"), (snapshot) => {
//   document.getElementById("totalUsers").innerText = snapshot.size;
// });


// // 🔥 Orders + Revenue
// onSnapshot(collection(db, "orders"), (snapshot) => {

//   let revenue = 0;
//   document.getElementById("totalOrders").innerText = snapshot.size;

//   const ordersList = document.getElementById("ordersList");
//   ordersList.innerHTML = "";

//   snapshot.forEach((docSnap) => {

//     const data = docSnap.data();
//     revenue += Number(data.total);

//     ordersList.innerHTML += `
//       <div class="order-card">
//         <strong>${data.name}</strong><br>
//         Total: ₹${data.total}<br>
//         <span class="status">Status: ${data.status}</span>

//         <div class="btn-group">
//           <button class="btn confirm"
//             onclick="updateStatus('${docSnap.id}', 'Confirmed')">
//             Confirm
//           </button>

//           <button class="btn cancel"
//             onclick="updateStatus('${docSnap.id}', 'Cancelled')">
//             Cancel
//           </button>
//         </div>
//       </div>
//     `;
//   });

//   document.getElementById("totalRevenue").innerText = "₹" + revenue;
// });


// // 🔄 Update Order Status
// window.updateStatus = async function(orderId, status) {
//   await updateDoc(doc(db, "orders", orderId), {
//     status: status
//   });
// };


// // 🚪 Logout
// window.logout = function () {
//   signOut(auth);
//   window.location.href = "../login.html";
// };


import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const firebaseConfig = {
 apiKey: "AIzaSyC7vH9Km127NKd4Scigg3LJts5A4Mppu3A",
    authDomain: "catering-reservation-f0895.firebaseapp.com",
    projectId: "catering-reservation-f0895",
    storageBucket: "catering-reservation-f0895.firebasestorage.app",
    messagingSenderId: "815352672480",
    appId: "1:815352672480:web:b7658e14364c73b40b6085"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const ADMIN_EMAIL = "admin@cateringcraft.gmail.com";

onAuthStateChanged(auth, (user) => {

  if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  if (user.email !== ADMIN_EMAIL) {
    alert("Access Denied! Not Admin.");
    window.location.href = "/html/index.html";
    return;
  }

  loadDashboard();
});

function loadDashboard() {
    // // 🔥 Total Users
onSnapshot(collection(db, "users"), (snapshot) => {
  document.getElementById("totalUsers").innerText = snapshot.size;
});

  // Real-time Orders
//   onSnapshot(collection(db, "orders"), (snapshot) => {

//     document.getElementById("totalOrders").innerText =
//       snapshot.size;

//     const container = document.getElementById("ordersContainer");
//     container.innerHTML = "";

//     snapshot.forEach((doc) => {
//       const data = doc.data();

//       container.innerHTML += `
//         <div class="order-card">
//           <p><strong>Name:</strong> ${data.name}</p>
//           <p><strong>Total:</strong> ₹${data.total}</p>
//           <p><strong>Status:</strong> ${data.status}</p>
//         </div>
//       `;
//     });
//   });

  // Real-time Reservations
  onSnapshot(collection(db, "reservations"), (snapshot) => {
    document.getElementById("totalReservations").innerText =
      snapshot.size;
  });
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth);
  window.location.href = "/html/login.html";
});


  // 🔥 TOTAL REVENUE + ORDERS
  onSnapshot(collection(db, "orders"), (snapshot) => {

    let revenue = 0;

    snapshot.forEach((doc) => {
      const data = doc.data();
      revenue += Number(data.total);
    });

    document.getElementById("totalRevenue").innerText =
      "₹" + revenue;

  });


  // 🔥 MENU ITEMS
// TOTAL MENU ITEMS
onSnapshot(collection(db, "menu"), (snapshot) => {
  document.getElementById("totalMenu").innerText =
    snapshot.size;
});



