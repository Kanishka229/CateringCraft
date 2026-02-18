
// import { auth, db } from "../js/firebase.js";
// import {
//   collection,
//   getDocs,
//   doc,
//   updateDoc,
//   deleteDoc,
//   getDoc
// } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// onAuthStateChanged(auth, async (user) => {

//   if (!user) {
//     window.location.href = "/html/login.html";
//     return;
//   }

//   const userDoc = await getDoc(doc(db, "users", user.uid));
//   const role = userDoc.data().role;

//   if (role !== "admin") {
//     alert("Access Denied");
//     window.location.href = "/html/index.html";
//     return;
//   }

//   loadOrders();
// });

// async function loadOrders() {

//   const snap = await getDocs(collection(db, "orders"));
//   const container = document.getElementById("orders");
//   container.innerHTML = "";

//   snap.forEach(docSnap => {

//     const data = docSnap.data();

//     container.innerHTML += `
//       <div class="order-card slide-in">
//         <h3>Order ID: ${docSnap.id}</h3>
//         <p>Total: $${data.total}</p>
//         <p>Status: <span class="badge ${data.status}">
//           ${data.status}
//         </span></p>

//         <button onclick="updateStatus('${docSnap.id}','confirmed')">Confirm</button>
//         <button onclick="updateStatus('${docSnap.id}','completed')">Complete</button>
//         <button onclick="deleteOrder('${docSnap.id}')">Delete</button>
//       </div>
//     `;
//   });
// }

// window.updateStatus = async (id, status) => {
//   await updateDoc(doc(db, "orders", id), { status });
//   loadOrders();
// };

// window.deleteOrder = async (id) => {
//   await deleteDoc(doc(db, "orders", id));
//   loadOrders();
// };



import { db } from "../js/firebase.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const container = document.getElementById("ordersContainer");

async function loadOrders() {
  container.innerHTML = "";

  const snapshot = await getDocs(collection(db, "orders"));

  snapshot.forEach(docSnap => {
    const order = docSnap.data();
    
    
    const orderId = docSnap.id;

    const div = document.createElement("div");
    div.className = "order-card";

    let itemsHTML = "";
    order.items.forEach(item => {
      itemsHTML += `
        <p>${item.name} x ${item.quantity} - ₹${item.price}</p>
      `;
    });

    div.innerHTML = `
      <h3>Order ID: ${orderId}</h3>
     
      <p><strong>Name:</strong> ${order.name}</p>
      <p><strong>phone:</strong> ${order.phone}</p>
      <p><strong>Address:</strong> ${order.address}</p>

      <div>${itemsHTML}</div>
      <p><strong>Total:</strong> ₹${order.total}</p>
       <span class="status ${order.status || "pending"}">
    ${(order.status || "pending").toUpperCase()}
  </span>
<div class="actions">
    <button onclick="updateStatus('${docSnap.id}','confirmed')">Confirm</button>
     <button onclick="deleteOrder('${docSnap.id}')">Delete</button>
         <button onclick="updateStatus('${docSnap.id}','completed')">Complete</button>
        
      </div>
      </div>

    `;

    container.appendChild(div);
  });
}

window.updateStatus = async (orderId, newStatus) => {
  await updateDoc(doc(db, "orders", orderId,), {
    status: newStatus
  });

  alert("Status Updated");
  loadOrders();
};

loadOrders();