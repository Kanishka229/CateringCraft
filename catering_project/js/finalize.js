import { auth, db } from "./firebase.js";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const orderItemsDiv = document.getElementById("orderItems");
const totalAmountSpan = document.getElementById("totalAmount");
const placeOrderBtn = document.getElementById("placeOrderBtn");

let cartItems = [];
let total = 0;

// Toast
function showToast(msg) {
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.style.display = "block";
  setTimeout(() => t.style.display = "none", 3000);
}

// Load cart
auth.onAuthStateChanged(async user => {

  if (!user) {
    showToast("Please login first");
    setTimeout(() => window.location.href = "login.html", 1500);
    return;
  }
cartItems=[];
total= 0;
orderItemsDiv.innerHTML="";
  const cartRef = collection(db, "users", user.uid, "cart");
  const snapshot = await getDocs(cartRef);

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    cartItems.push({ id: docSnap.id, ...data });

    total += data.price * data.quantity;

    orderItemsDiv.innerHTML += `
    <div>
      <img src="${data.image}">
     ${data.name} x ${data.quantity} = ₹${data.price * data.quantity}
      </div>
    `;
  });

  totalAmountSpan.innerText = total;
});

// Place order
placeOrderBtn.addEventListener("click", async () => {

  const user = auth.currentUser;
  if (!user) return;

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  if (!name || !phone || !address) {
    showToast("Fill all fields");
    return;
  }

  if (cartItems.length === 0) {
    showToast("Cart is empty");
    return;
  }

  // Save order
  await addDoc(collection(db, "orders"), {
    userId: user.uid,
    name,
    phone,
    address,
    total,
    items: cartItems,
    status: "pending",
    createdAt: serverTimestamp()
  });

  // Clear cart
  const cartRef = collection(db, "users", user.uid, "cart");
  const snapshot = await getDocs(cartRef);

  snapshot.forEach(async docSnap => {
    await deleteDoc(doc(db, "users", user.uid, "cart", docSnap.id));
  });

  showToast("Order Placed Successfully ✅");

  setTimeout(() => {
    window.location.href = "menu.html";
  }, 2000);

});