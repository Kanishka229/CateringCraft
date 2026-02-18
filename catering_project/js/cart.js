// import { auth, db } from "./js/firebase.js";
// import {
//   collection,
//   getDocs,
//   doc,
//   deleteDoc,
//   updateDoc,
//   addDoc,
//   getDoc,
//   serverTimestamp
// } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
// import { onAuthStateChanged }
// from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// let currentUser;

// onAuthStateChanged(auth, (user) => {
//   if (!user) {
//     showToast("Login required");
//     return;
//   }
//   currentUser = user;
//   loadCart();
// });

// async function loadCart() {
//   const snap = await getDocs(
//     collection(db, "users", currentUser.uid, "cart")
//   );

//   let subtotal = 0;
//   const container = document.getElementById("cartItems");
//   container.innerHTML = "";

//   snap.forEach(docSnap => {
//     const item = docSnap.data();
//     subtotal += item.price * item.quantity;

//     container.innerHTML += `
//       <div class="cart-item">
//         <img src="${item.image}" />
//         <h4>${item.name}</h4>
//         <p>₹${item.price}</p>
//         <div>
//           <button onclick="changeQty('${docSnap.id}', -1)">-</button>
//           ${item.quantity}
//           <button onclick="changeQty('${docSnap.id}', 1)">+</button>
//         </div>
//         <button onclick="removeItem('${docSnap.id}')">Remove</button>
//       </div>
//     `;
//   });

//   const tax = subtotal * 0.15;
//   const total = subtotal + tax;

//   document.getElementById("subtotal").innerText = subtotal;
//   document.getElementById("tax").innerText = tax.toFixed(2);
//   document.getElementById("total").innerText = total.toFixed(2);
// }

// window.changeQty = async (id, change) => {
//   const ref = doc(db, "users", User.uid, "cart", id);
//   const snap = await getDoc(ref);

//   if (!snap.exists()) return;

//   let data = snap.data();
//   let newQty = data.quantity + change;

//   if (newQty <= 0) {
//     await deleteDoc(ref);
//   } else {
//     await updateDoc(ref, { quantity: newQty });
//   }

//   loadCart();
// };

// window.removeItem = async (id) => {
//   await deleteDoc(doc(db, "users", currentUser.uid, "cart", id));
//   loadCart();
// };

// document.getElementById("checkoutBtn").onclick = () => {
//   document.querySelector(".cart-container").style.display = "none";
//   document.getElementById("finalizeSection").style.display = "block";
// };

// document.getElementById("orderForm")
// .addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const snap = await getDocs(
//     collection(db, "users", currentUser.uid, "cart")
//   );

//   let items = [];
//   let subtotal = 0;

//   snap.forEach(docSnap => {
//     const item = docSnap.data();
//     subtotal += item.price * item.quantity;
//     items.push(item);
//   });

//   const tax = subtotal * 0.15;
//   const total = subtotal + tax;

//   await addDoc(collection(db, "orders"), {
//     userId: currentUser.uid,
//     items,
//     subtotal,
//     tax,
//     total,
//     status: "pending",
//     createdAt: serverTimestamp()
//   });

//   snap.forEach(async (docSnap) => {
//     await deleteDoc(docSnap.ref);
//   });

//   showToast("Order placed successfully!");
//   loadCart();
//   document.getElementById("finalizeSection").style.display = "none";
//   document.querySelector(".cart-container").style.display = "block";
// });

// function showToast(message) {
//   const toast = document.getElementById("toast");
//   toast.innerText = message;
//   toast.classList.add("show");

//   setTimeout(() => {
//     toast.classList.remove("show");
//   }, 3000);
// }

import { db, auth } from "./firebase.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const container = document.getElementById("cartContainer");
const totalPriceEl = document.getElementById("totalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");

let cartItems = [];
let total = 0;

// Check login
auth.onAuthStateChanged(user => {
  if (!user) {
    showToast("Please login first");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
    return;
  }

  loadCart(user.uid);
});

// Load Cart
async function loadCart(uid) {
  container.innerHTML = "";
  total = 0;
  cartItems = [];

  const snapshot = await getDocs(collection(db, "users", uid, "cart"));

  snapshot.forEach(docSnap => {
    cartItems.push({ id: docSnap.id, ...docSnap.data() });
  });

  renderCart(uid);
}

function renderCart(uid) {
  container.innerHTML = "";

  if (cartItems.length === 0) {
    container.innerHTML = "<h3>Your cart is empty </h3>";
    totalPriceEl.innerText = 0;
    return;
  }

  cartItems.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}">
      <div class="cart-info">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <p>Qty: ${item.quantity}</p>
      </div>
      <div class="cart-actions">
              <button onclick="decreaseQty('${uid}','${item.id}',${item.quantity})">-</button>
        <button onclick="increaseQty('${uid}','${item.id}',${item.quantity})">+</button>

        <button onclick="removeItem('${uid}','${item.id}')">Delete</button>
      </div>
    `;

    container.appendChild(div);
  });

  totalPriceEl.innerText = total;
}

// Increase
window.increaseQty = async (uid, id, qty) => {
  await updateDoc(doc(db, "users", uid, "cart", id), {
    quantity: qty + 1
  });
  loadCart(uid);
};

// Decrease
window.decreaseQty = async (uid, id, qty) => {
  if (qty <= 1) return;

  await updateDoc(doc(db, "users", uid, "cart", id), {
    quantity: qty - 1
  });
  loadCart(uid);
};

// Remove
window.removeItem = async (uid, id) => {
  await deleteDoc(doc(db, "users", uid, "cart", id));
  showToast("Item removed");
  loadCart(uid);
};

// Checkout
checkoutBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return;

  if (cartItems.length === 0) {
    showToast("Cart is empty");
    return;
  }

//   await addDoc(collection(db, "orders"), {
//     userId: user.uid,
//     items: cartItems,
//     total: total,
//     status: "pending",
//     createdAt: new Date()
//   }
// );

  showToast("Order placed successfully ✅");

  setTimeout(() => {
    window.location.href = "finalize.html";
  }, 1500);
});

// Toast
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}











